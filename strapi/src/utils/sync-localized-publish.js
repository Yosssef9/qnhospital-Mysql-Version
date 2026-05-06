"use strict";

/**
 * Publish all localizations of the same document when one locale is published.
 *
 * @param {object} strapi - Strapi instance
 * @param {string} uid - Content type UID, example: "api::homepage-hero-slide.homepage-hero-slide"
 * @param {object} entry - Lifecycle result entry
 * @param {object} options
 * @param {string[]} options.locales - Locales to publish, example: ["en", "ar"]
 */
async function syncLocalizedPublish(strapi, uid, entry, options = {}) {
  const locales = options.locales || ["en", "ar"];

  if (!entry) return;

  const documentId = entry.documentId;
  const currentLocale = entry.locale;

  if (!documentId || !currentLocale) return;

  /**
   * Prevent infinite loop.
   * Because publishing another locale may trigger lifecycle again.
   */
  if (global.__syncLocalizedPublishRunning) return;

  try {
    global.__syncLocalizedPublishRunning = true;

    for (const locale of locales) {
      if (locale === currentLocale) continue;

      try {
        await strapi.documents(uid).publish({
          documentId,
          locale,
        });

        strapi.log.info(
          `[syncLocalizedPublish] Published ${uid} | documentId=${documentId} | locale=${locale}`,
        );
      } catch (error) {
        strapi.log.warn(
          `[syncLocalizedPublish] Could not publish ${uid} | documentId=${documentId} | locale=${locale}: ${error.message}`,
        );
      }
    }
  } finally {
    global.__syncLocalizedPublishRunning = false;
  }
}

module.exports = {
  syncLocalizedPublish,
};
