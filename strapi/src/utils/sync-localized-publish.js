"use strict";

/**
 * Publish all localizations of the same document when one locale is published.
 *
 * @param {object} strapi - Strapi instance
 * @param {string} uid - Content type UID
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

  if (global.__syncLocalizedPublishRunning) return;

  global.__syncLocalizedPublishRunning = true;

  setTimeout(async () => {
    try {
      for (const locale of locales) {
        if (locale === currentLocale) continue;

        try {
          const targetEntry = await strapi.documents(uid).findFirst({
            documentId,
            locale,
          });

          if (!targetEntry) {
            strapi.log.warn(
              `[syncLocalizedPublish] Missing localized entry | ${uid} | documentId=${documentId} | locale=${locale}`,
            );
            continue;
          }

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
  }, 2000);
}

module.exports = {
  syncLocalizedPublish,
};
