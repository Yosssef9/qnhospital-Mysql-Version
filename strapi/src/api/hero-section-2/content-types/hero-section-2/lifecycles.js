"use strict";

const {
  syncLocalizedPublish,
} = require("../../../../utils/sync-localized-publish");

const UID = "api::hero-section-2.hero-section-2";

async function syncPublish(event) {
  const { result } = event;

  if (!result?.publishedAt) return;

  await syncLocalizedPublish(strapi, UID, result, {
    locales: ["en", "ar"],
  });
}

module.exports = {
  async afterCreate(event) {
    await syncPublish(event);
  },

  async afterUpdate(event) {
    await syncPublish(event);
  },
};
