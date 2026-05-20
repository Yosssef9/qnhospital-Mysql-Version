"use strict";

function isLocalizedAttribute(attribute) {
  return attribute?.pluginOptions?.i18n?.localized === true;
}

function isNonLocalizedAttribute(attribute) {
  return attribute?.pluginOptions?.i18n?.localized === false;
}

function getRelationValue(value, attribute) {
  if (!value) return value;

  if (attribute.type === "media") {
    if (attribute.multiple) {
      return Array.isArray(value) ? value.map((item) => item.id) : [];
    }

    return value?.id || null;
  }

  return value;
}

function getNonLocalizedData(schema, entry) {
  const data = {};

  Object.entries(schema.attributes || {}).forEach(([key, attribute]) => {
    if (!isNonLocalizedAttribute(attribute)) return;
    if (!(key in entry)) return;

    data[key] = getRelationValue(entry[key], attribute);
  });

  return data;
}

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
      const schema = strapi.contentTypes[uid];

      if (!schema) {
        strapi.log.warn(`[syncLocalizedPublish] Missing schema for ${uid}`);
        return;
      }

      const nonLocalizedData = getNonLocalizedData(schema, entry);

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

          if (Object.keys(nonLocalizedData).length > 0) {
            await strapi.documents(uid).update({
              documentId,
              locale,
              data: nonLocalizedData,
            });
          }

          await strapi.documents(uid).publish({
            documentId,
            locale,
          });

          strapi.log.info(
            `[syncLocalizedPublish] Synced non-localized fields and published ${uid} | documentId=${documentId} | locale=${locale}`,
          );
        } catch (error) {
          strapi.log.warn(
            `[syncLocalizedPublish] Could not sync/publish ${uid} | documentId=${documentId} | locale=${locale}: ${error.message}`,
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
