"use strict";

const { ApplicationError } = require("@strapi/utils").errors;

const {
  syncLocalizedPublish,
} = require("../../../../utils/sync-localized-publish");

const UID = "api::doctor.doctor";

const parentFields = ["clinic", "unit", "medical_service", "center"];

async function syncPublish(event) {
  const { result } = event;

  if (!result?.publishedAt) return;

  await syncLocalizedPublish(strapi, UID, result, {
    locales: ["en", "ar"],
  });
}

module.exports = {
  async beforeCreate(event) {
    validateOnlyOneParent(event.params.data);
  },

  async beforeUpdate(event) {
    const data = event.params.data || {};

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
    await syncPublish(event);
  },

  async afterUpdate(event) {
    await syncPublish(event);
  },
};

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

    // Important:
    // Strapi sometimes sends empty relation operation objects during publish/edit.
    // In this case, keep the existing relation instead of treating it as empty.
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
