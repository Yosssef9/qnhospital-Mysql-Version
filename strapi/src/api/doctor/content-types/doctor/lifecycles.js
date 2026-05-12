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
    const existingDoctor = await strapi.db.query(UID).findOne({
      where: event.params.where,
      populate: parentFields,
    });

    const mergedData = {
      clinic: existingDoctor?.clinic,
      unit: existingDoctor?.unit,
      medical_service: existingDoctor?.medical_service,
      center: existingDoctor?.center,
      ...event.params.data,
    };

    validateOnlyOneParent(mergedData);
  },

  async afterCreate(event) {
    await syncPublish(event);
  },

  async afterUpdate(event) {
    await syncPublish(event);
  },
};

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
