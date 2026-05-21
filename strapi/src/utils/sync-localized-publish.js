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

function normalizeFieldValue(value, attribute) {
  if (attribute.type === "media") {
    return getMediaValue(value, attribute);
  }

  return value;
}

function getPopulate(schema) {
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

    const value = normalizeFieldValue(entry[key], attribute);

    data[key] = value;
  });

  return data;
}

async function syncLocalizedPublish(strapi, uid, entry, options = {}) {
  const locales = options.locales || ["en", "ar"];

  if (!entry?.documentId || !entry?.locale) return;

  const documentId = entry.documentId;
  const currentLocale = entry.locale;

  global.__localizedSyncLocks = global.__localizedSyncLocks || new Set();

  const lockKey = `${uid}:${documentId}`;

  if (global.__localizedSyncLocks.has(lockKey)) {
    return;
  }

  global.__localizedSyncLocks.add(lockKey);

  try {
    const schema = strapi.contentTypes[uid];

    if (!schema) return;

    await sleep(300);

    const populate = getPopulate(schema);

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

      await strapi.documents(uid).update({
        documentId,
        locale,
        data: nonLocalizedData,

        // VERY IMPORTANT
        status: "draft",
      });

      await sleep(300);

      await strapi.documents(uid).publish({
        documentId,
        locale,
      });
    }
  } catch (error) {
    strapi.log.error(`[syncLocalizedPublish] ${uid}: ${error.message}`);
  } finally {
    global.__localizedSyncLocks.delete(lockKey);
  }
}

module.exports = {
  syncLocalizedPublish,
};
