"use strict";

const slugify = require("slugify");

const {
  syncLocalizedPublish,
} = require("../../../../utils/sync-localized-publish");

const UID = "api::hospital-accreditation.hospital-accreditation";

function generateEnglishSlug(title) {
  return slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });
}

function generateTemporarySlug() {
  return `hospital-accreditation-${Date.now()}`;
}

async function syncSlugToLocalizations(result) {
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
      strapi.log.error(
        `Failed syncing slug to ${localization.locale}:`,
        err,
      );
    }
  }
}

async function syncPublish(event) {
  const { result } = event;

  if (!result?.publishedAt) return;

  await syncLocalizedPublish(strapi, UID, result, {
    locales: ["en", "ar"],
  });
}

module.exports = {
  async beforeCreate(event) {
    const data = event.params.data || {};

    if (data.locale === "en" && data.title) {
      data.slug = generateEnglishSlug(data.title);
    }

    if (data.locale === "ar" && !data.slug) {
      data.slug = generateTemporarySlug();
    }
  },

  async beforeUpdate(event) {
    const data = event.params.data || {};

    if (data.locale === "en" && data.title) {
      data.slug = generateEnglishSlug(data.title);
    }
  },

  async afterCreate(event) {
    await syncSlugToLocalizations(event.result);
    await syncPublish(event);
  },

  async afterUpdate(event) {
    await syncSlugToLocalizations(event.result);
    await syncPublish(event);
  },
};