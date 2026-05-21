"use strict";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isNonLocalizedAttribute(attribute) {
  return attribute?.pluginOptions?.i18n?.localized === false;
}

function getMediaValue(value, attribute) {
  if (value === undefined) return undefined;
  if (value === null) return null;

  if (attribute.multiple) {
    if (!Array.isArray(value)) return [];
    return value.map((item) => item?.id || item).filter(Boolean);
  }

  return value?.id || value || null;
}

function getFieldValue(value, attribute) {
  if (attribute.type === "media") {
    return getMediaValue(value, attribute);
  }

  return value;
}

function getPopulateForNonLocalizedMedia(schema) {
  const populate = {};

  Object.entries(schema.attributes || {}).forEach(([key, attribute]) => {
    if (isNonLocalizedAttribute(attribute) && attribute.type === "media") {
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

    const value = getFieldValue(entry[key], attribute);

    if (value !== undefined) {
      data[key] = value;
    }
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

  // Important: lock by document, NOT by locale
  const lockKey = `${uid}:${documentId}`;

  if (global.__syncLocalizedPublishRunning.has(lockKey)) {
    return;
  }

  global.__syncLocalizedPublishRunning.add(lockKey);

  try {
    const schema = strapi.contentTypes[uid];

    if (!schema) {
      strapi.log.warn(`[syncLocalizedPublish] Missing schema for ${uid}`);
      return;
    }

    await sleep(500);

    const populate = getPopulateForNonLocalizedMedia(schema);

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

      if (!targetEntry) continue;

      if (Object.keys(nonLocalizedData).length > 0) {
        await strapi.documents(uid).update({
          documentId,
          locale,
          data: nonLocalizedData,
        });
      }

      await sleep(500);

      await strapi.documents(uid).publish({
        documentId,
        locale,
      });
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
