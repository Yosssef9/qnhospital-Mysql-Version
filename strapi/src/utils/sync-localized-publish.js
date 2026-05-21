"use strict";

async function syncLocalizedPublish(strapi, uid, entry, options = {}) {
  const locales = options.locales || ["en", "ar"];

  if (!entry?.documentId || !entry?.locale) return;

  const documentId = entry.documentId;
  const currentLocale = entry.locale;

  global.__syncLocalizedPublishRunning =
    global.__syncLocalizedPublishRunning || new Set();

  const lockKey = `${uid}:${documentId}`;

  if (global.__syncLocalizedPublishRunning.has(lockKey)) {
    return;
  }

  global.__syncLocalizedPublishRunning.add(lockKey);

  try {
    for (const locale of locales) {
      if (locale === currentLocale) continue;

      await strapi.documents(uid).publish({
        documentId,
        locale,
      });
    }
  } catch (error) {
    strapi.log.error(`[syncLocalizedPublish] ${uid}: ${error.message}`);
  } finally {
    global.__syncLocalizedPublishRunning.delete(lockKey);
  }
}

module.exports = {
  syncLocalizedPublish,
};
