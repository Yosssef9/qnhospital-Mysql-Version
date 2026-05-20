"use strict";

const { ApplicationError } = require("@strapi/utils").errors;
const slugify = require("slugify");

const UID = "api::doctor.doctor";

const parentFields = ["clinic", "unit", "medical_service", "center"];

function generateEnglishSlug(name) {
  return slugify(name, {
    lower: true,
    strict: true,
    trim: true,
  });
}

function generateTemporarySlug() {
  return `doctor-${Date.now()}`;
}

module.exports = {
  async beforeCreate(event) {
    const data = event.params.data || {};

    // EN locale → generate real English slug
    if (data.locale === "en" && data.name) {
      data.slug = generateEnglishSlug(data.name);
    }

    // AR locale before EN localization exists
    if (data.locale === "ar" && !data.slug) {
      data.slug = generateTemporarySlug();
    }

    validateOnlyOneParent(data);
  },

  async beforeUpdate(event) {
    const data = event.params.data || {};

    // Regenerate slug when EN doctor name changes
    if (data.locale === "en" && data.name) {
      data.slug = generateEnglishSlug(data.name);
    }

    const existingDoctor = await strapi.db.query(UID).findOne({
      where: event.params.where,
      populate: parentFields,
    });

    const finalData = {};

    parentFields.forEach((field) => {
      finalData[field] = resolveRelationValue({
        field,
        data,
        existingDoctor,
      });
    });

    validateOnlyOneParent(finalData);
  },

  async afterCreate(event) {
    await syncSlugToLocalizations(event.result);
  },

  async afterUpdate(event) {
    await syncSlugToLocalizations(event.result);
  },
};

async function syncSlugToLocalizations(result) {
  // ONLY sync from EN locale
  if (result.locale !== "en" || !result.slug || !result.localizations?.length) {
    return;
  }

  for (const localization of result.localizations) {
    try {
      await strapi.documents(UID).update({
        documentId: localization.documentId,
        locale: localization.locale,
        data: {
          slug: result.slug,
        },
        status: "published",
      });
    } catch (err) {
      strapi.log.error(`Failed syncing slug to ${localization.locale}:`, err);
    }
  }
}

function resolveRelationValue({ field, data, existingDoctor }) {
  const hasFieldInPayload = Object.prototype.hasOwnProperty.call(data, field);

  if (!hasFieldInPayload) {
    return existingDoctor?.[field] || null;
  }

  const value = data[field];

  if (!value) return null;

  if (typeof value === "number" || typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? value : null;
  }

  if (typeof value === "object") {
    if (value.id || value.documentId) return value;

    if (Array.isArray(value.connect) && value.connect.length > 0) {
      return value;
    }

    if (Array.isArray(value.set)) {
      return value.set.length > 0 ? value : null;
    }

    // Keep existing relation during empty publish payloads
    if (
      Array.isArray(value.connect) &&
      value.connect.length === 0 &&
      Array.isArray(value.disconnect) &&
      value.disconnect.length === 0
    ) {
      return existingDoctor?.[field] || null;
    }

    if (Array.isArray(value.disconnect) && value.disconnect.length > 0) {
      return null;
    }

    return existingDoctor?.[field] || null;
  }

  return existingDoctor?.[field] || null;
}

function validateOnlyOneParent(data) {
  const selectedParents = parentFields.filter((field) =>
    hasRelation(data[field]),
  );

  if (selectedParents.length === 0) {
    throw new ApplicationError(
      "Please connect the doctor to one parent: Clinic, Unit, Medical Service, or Center.",
    );
  }

  if (selectedParents.length > 1) {
    throw new ApplicationError(
      "Doctor can be connected to only one parent: Clinic, Unit, Medical Service, or Center.",
    );
  }
}

function hasRelation(value) {
  if (!value) return false;

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === "number" || typeof value === "string") {
    return true;
  }

  if (typeof value === "object") {
    if (value.id || value.documentId) return true;

    if (Array.isArray(value.connect) && value.connect.length > 0) return true;

    if (Array.isArray(value.set) && value.set.length > 0) return true;

    return false;
  }

  return false;
}
