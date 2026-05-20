"use strict";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isNonLocalizedAttribute(attribute) {
  return attribute?.pluginOptions?.i18n?.localized === false;
}

function getMediaValue(value, attribute) {
  if (!value) return null;

  if (attribute.multiple) {
    return Array.isArray(value) ? value.map((item) => item.id || item) : [];
  }

  return value?.id || value;
}

function getRelationValue(value, attribute) {
  if (attribute.type === "media") {
    return getMediaValue(value, attribute);
  }

  return value;
}

function getNonLocalizedPopulate(schema) {
  const populate = {};

  Object.entries(schema.attributes || {}).forEach(([key, attribute]) => {
    if (!isNonLocalizedAttribute(attribute)) return;

    if (attribute.type === "media") {
      populate[key] = true;
    }
  });

  return populate;
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

  if (!entry?.documentId || !entry?.locale) return;

  const documentId = entry.documentId;
  const currentLocale = entry.locale;

  global.__syncLocalizedPublishRunning =
    global.__syncLocalizedPublishRunning || new Set();

  const lockKey = `${uid}:${documentId}:${currentLocale}`;

  if (global.__syncLocalizedPublishRunning.has(lockKey)) return;

  global.__syncLocalizedPublishRunning.add(lockKey);

  try {
    const schema = strapi.contentTypes[uid];

    if (!schema) {
      strapi.log.warn(`[syncLocalizedPublish] Missing schema for ${uid}`);
      return;
    }

    await sleep(800);

    const populate = getNonLocalizedPopulate(schema);

    const sourceEntry = await strapi.documents(uid).findFirst({
      documentId,
      locale: currentLocale,
      populate,
    });

    if (!sourceEntry) return;

    const nonLocalizedData = getNonLocalizedData(schema, sourceEntry);

    for (const locale of locales) {
      if (locale === currentLocale) continue;

      const targetEntry = await strapi.documents(uid).findFirst({
        documentId,
        locale,
      });

      if (!targetEntry) {
        strapi.log.warn(
          `[syncLocalizedPublish] Missing localized entry | ${uid} | ${locale}`,
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

      await sleep(800);

      await strapi.documents(uid).publish({
        documentId,
        locale,
      });

      strapi.log.info(
        `[syncLocalizedPublish] Synced and published ${uid} | ${locale}`,
      );
    }
  } catch (error) {
    strapi.log.warn(
      `[syncLocalizedPublish] Failed ${uid} | documentId=${documentId}: ${error.message}`,
    );
  } finally {
    global.__syncLocalizedPublishRunning.delete(lockKey);
  }
}

module.exports = {
  syncLocalizedPublish,
};
