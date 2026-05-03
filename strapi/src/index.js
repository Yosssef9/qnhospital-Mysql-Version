// "use strict";

// const slugify = require("slugify");

// function extractRelationDocumentId(value) {
//   if (!value) return null;

//   if (typeof value === "string") return value;

//   if (typeof value === "object" && value.documentId) {
//     return value.documentId;
//   }

//   if (Array.isArray(value.connect) && value.connect.length > 0) {
//     const first = value.connect[value.connect.length - 1];
//     if (typeof first === "string") return first;
//     if (first?.documentId) return first.documentId;
//   }

//   if (Array.isArray(value.set) && value.set.length > 0) {
//     const first = value.set[value.set.length - 1];
//     if (typeof first === "string") return first;
//     if (first?.documentId) return first.documentId;
//   }

//   return null;
// }

// function makeSlug(name) {
//   return slugify(name || "", {
//     lower: true,
//     strict: true,
//     trim: true,
//   });
// }

// function getOtherLocale(locale) {
//   return locale === "ar" ? "en" : "ar";
// }

// async function publishSiblingLocale(strapi, uid, documentId, locale, skipFlag) {
//   const otherLocale = getOtherLocale(locale);

//   await strapi.documents(uid).publish({
//     documentId,
//     locale: otherLocale,
//     [skipFlag]: true,
//   });
// }

// async function syncLocalizedRelationField({
//   strapi,
//   sourceUid,
//   targetRelationUid,
//   documentId,
//   locale,
//   relationField,
//   incomingRelationValue,
//   skipFlag,
// }) {
//   const otherLocale = getOtherLocale(locale);
//   const incomingRelationId = extractRelationDocumentId(incomingRelationValue);

//   // current locale entry
//   const currentEntry = await strapi.documents(sourceUid).findOne({
//     documentId,
//     locale,
//     populate: { [relationField]: true },
//   });

//   // CASE 1: current locale has no relation in payload
//   // autofill from sibling if current still empty
//   if (!incomingRelationId) {
//     if (currentEntry?.[relationField]?.documentId) {
//       return;
//     }

//     const siblingEntry = await strapi.documents(sourceUid).findOne({
//       documentId,
//       locale: otherLocale,
//       populate: { [relationField]: true },
//     });

//     const sourceRelationDocId = siblingEntry?.[relationField]?.documentId;
//     if (!sourceRelationDocId) return;

//     const localizedRelatedEntry = await strapi
//       .documents(targetRelationUid)
//       .findOne({
//         documentId: sourceRelationDocId,
//         locale,
//         fields: ["documentId"],
//       });

//     if (!localizedRelatedEntry?.documentId) return;

//     await strapi.documents(sourceUid).update({
//       documentId,
//       locale,
//       data: {
//         [relationField]: localizedRelatedEntry.documentId,
//         [skipFlag]: true,
//       },
//     });

//     return;
//   }

//   // CASE 2: relation changed manually -> sync sibling relation
//   const siblingLocalizedRelation = await strapi
//     .documents(targetRelationUid)
//     .findOne({
//       documentId: incomingRelationId,
//       locale: otherLocale,
//       fields: ["documentId"],
//     });

//   if (!siblingLocalizedRelation?.documentId) return;

//   const siblingEntry = await strapi.documents(sourceUid).findOne({
//     documentId,
//     locale: otherLocale,
//     populate: { [relationField]: true },
//   });

//   if (
//     siblingEntry &&
//     siblingEntry[relationField]?.documentId !==
//       siblingLocalizedRelation.documentId
//   ) {
//     await strapi.documents(sourceUid).update({
//       documentId,
//       locale: otherLocale,
//       data: {
//         [relationField]: siblingLocalizedRelation.documentId,
//         [skipFlag]: true,
//       },
//     });
//   }
// }

// async function syncDoctorSlugFromEnglish({ strapi, documentId }) {
//   const englishDoctor = await strapi.documents("api::doctor.doctor").findOne({
//     documentId,
//     locale: "en",
//     fields: ["slug", "name"],
//   });

//   let englishSlug = englishDoctor?.slug;

//   if (!englishSlug && englishDoctor?.name) {
//     englishSlug = makeSlug(englishDoctor.name);

//     await strapi.documents("api::doctor.doctor").update({
//       documentId,
//       locale: "en",
//       data: {
//         slug: englishSlug,
//         _skipDoctorSync: true,
//       },
//     });
//   }

//   if (!englishSlug) return;

//   const arabicDoctor = await strapi.documents("api::doctor.doctor").findOne({
//     documentId,
//     locale: "ar",
//     fields: ["slug"],
//   });

//   if (arabicDoctor && arabicDoctor.slug !== englishSlug) {
//     await strapi.documents("api::doctor.doctor").update({
//       documentId,
//       locale: "ar",
//       data: {
//         slug: englishSlug,
//         _skipDoctorSync: true,
//       },
//     });
//   }
// }

// module.exports = {
//   register({ strapi }) {
//     strapi.documents.use(async (context, next) => {
//       const { uid, action, params = {} } = context;
//       const { documentId, locale, data = {} } = params;

//       if (!locale || !["en", "ar"].includes(locale)) {
//         return next();
//       }

//       // ==================================================
//       // DOCTOR
//       // ==================================================
//       if (uid === "api::doctor.doctor") {
//         if (!["create", "update", "publish"].includes(action)) {
//           return next();
//         }

//         if (data._skipDoctorSync) {
//           const cleanData = { ...data };
//           delete cleanData._skipDoctorSync;
//           context.params.data = cleanData;
//           return next();
//         }

//         if (params._skipSiblingPublish) {
//           const cleanParams = { ...params };
//           delete cleanParams._skipSiblingPublish;
//           context.params = cleanParams;
//           return next();
//         }

//         if (action === "create" || action === "update") {
//           if (locale === "en" && data.name) {
//             context.params.data = {
//               ...data,
//               slug: makeSlug(data.name),
//             };
//           }

//           const result = await next();
//           const currentDocumentId = documentId || result?.documentId;

//           if (!currentDocumentId) return result;

//           try {
//             await syncDoctorSlugFromEnglish({
//               strapi,
//               documentId: currentDocumentId,
//             });

//             await syncLocalizedRelationField({
//               strapi,
//               sourceUid: "api::doctor.doctor",
//               targetRelationUid: "api::clinic.clinic",
//               documentId: currentDocumentId,
//               locale,
//               relationField: "clinic",
//               incomingRelationValue: data.clinic,
//               skipFlag: "_skipDoctorSync",
//             });
//           } catch (err) {
//             strapi.log.error("Doctor sync failed:", err);
//           }

//           return result;
//         }

//         if (action === "publish") {
//           const result = await next();

//           try {
//             if (!documentId) return result;

//             await syncDoctorSlugFromEnglish({ strapi, documentId });

//             await publishSiblingLocale(
//               strapi,
//               "api::doctor.doctor",
//               documentId,
//               locale,
//               "_skipSiblingPublish",
//             );
//           } catch (err) {
//             strapi.log.error("Doctor sibling publish failed:", err);
//           }

//           return result;
//         }
//       }

//       // ==================================================
//       // OUR DOCTORS SECTION
//       // ==================================================
//       if (uid === "api::our-doctors-section.our-doctors-section") {
//         if (!["create", "update", "publish"].includes(action)) {
//           return next();
//         }

//         if (data._skipOurDoctorsSectionSync) {
//           const cleanData = { ...data };
//           delete cleanData._skipOurDoctorsSectionSync;
//           context.params.data = cleanData;
//           return next();
//         }

//         if (params._skipOurDoctorsSectionSiblingPublish) {
//           const cleanParams = { ...params };
//           delete cleanParams._skipOurDoctorsSectionSiblingPublish;
//           context.params = cleanParams;
//           return next();
//         }

//         if (action === "create" || action === "update") {
//           const result = await next();
//           const currentDocumentId = documentId || result?.documentId;

//           if (!currentDocumentId) return result;

//           try {
//             await syncLocalizedRelationField({
//               strapi,
//               sourceUid: "api::our-doctors-section.our-doctors-section",
//               targetRelationUid: "api::doctor.doctor",
//               documentId: currentDocumentId,
//               locale,
//               relationField: "doctor",
//               incomingRelationValue: data.doctor,
//               skipFlag: "_skipOurDoctorsSectionSync",
//             });
//           } catch (err) {
//             strapi.log.error("Our doctors section sync failed:", err);
//           }

//           return result;
//         }

//         if (action === "publish") {
//           const result = await next();

//           try {
//             if (!documentId) return result;

//             await publishSiblingLocale(
//               strapi,
//               "api::our-doctors-section.our-doctors-section",
//               documentId,
//               locale,
//               "_skipOurDoctorsSectionSiblingPublish",
//             );
//           } catch (err) {
//             strapi.log.error(
//               "Our doctors section sibling publish failed:",
//               err,
//             );
//           }

//           return result;
//         }
//       }

//       return next();
//     });
//   },
// };

"use strict";

const slugify = require("slugify");

const AUTO_PUBLISH_SIBLING_UIDS = [
  "api::clinic.clinic",
  "api::center.center",
  "api::unit.unit",
  "api::medical-service.medical-service",
];

function extractRelationDocumentId(value) {
  if (!value) return null;

  if (typeof value === "string") return value;

  if (typeof value === "object" && value.documentId) {
    return value.documentId;
  }

  if (Array.isArray(value.connect) && value.connect.length > 0) {
    const first = value.connect[value.connect.length - 1];
    if (typeof first === "string") return first;
    if (first?.documentId) return first.documentId;
  }

  if (Array.isArray(value.set) && value.set.length > 0) {
    const first = value.set[value.set.length - 1];
    if (typeof first === "string") return first;
    if (first?.documentId) return first.documentId;
  }

  return null;
}

function makeSlug(name) {
  return slugify(name || "", {
    lower: true,
    strict: true,
    trim: true,
  });
}

function getOtherLocale(locale) {
  return locale === "ar" ? "en" : "ar";
}

async function publishSiblingLocale(strapi, uid, documentId, locale, skipFlag) {
  const otherLocale = getOtherLocale(locale);

  await strapi.documents(uid).publish({
    documentId,
    locale: otherLocale,
    [skipFlag]: true,
  });
}

async function syncLocalizedRelationField({
  strapi,
  sourceUid,
  targetRelationUid,
  documentId,
  locale,
  relationField,
  incomingRelationValue,
  skipFlag,
}) {
  const otherLocale = getOtherLocale(locale);
  const incomingRelationId = extractRelationDocumentId(incomingRelationValue);

  const currentEntry = await strapi.documents(sourceUid).findOne({
    documentId,
    locale,
    populate: { [relationField]: true },
  });

  // CASE 1: current locale has no relation in payload
  // autofill from sibling if current still empty
  if (!incomingRelationId) {
    if (currentEntry?.[relationField]?.documentId) {
      return;
    }

    const siblingEntry = await strapi.documents(sourceUid).findOne({
      documentId,
      locale: otherLocale,
      populate: { [relationField]: true },
    });

    const sourceRelationDocId = siblingEntry?.[relationField]?.documentId;
    if (!sourceRelationDocId) return;

    const localizedRelatedEntry = await strapi
      .documents(targetRelationUid)
      .findOne({
        documentId: sourceRelationDocId,
        locale,
        fields: ["documentId"],
      });

    if (!localizedRelatedEntry?.documentId) return;

    await strapi.documents(sourceUid).update({
      documentId,
      locale,
      data: {
        [relationField]: localizedRelatedEntry.documentId,
        [skipFlag]: true,
      },
    });

    return;
  }

  // CASE 2: relation changed manually -> sync sibling relation
  const siblingLocalizedRelation = await strapi
    .documents(targetRelationUid)
    .findOne({
      documentId: incomingRelationId,
      locale: otherLocale,
      fields: ["documentId"],
    });

  if (!siblingLocalizedRelation?.documentId) return;

  const siblingEntry = await strapi.documents(sourceUid).findOne({
    documentId,
    locale: otherLocale,
    populate: { [relationField]: true },
  });

  if (
    siblingEntry &&
    siblingEntry[relationField]?.documentId !==
      siblingLocalizedRelation.documentId
  ) {
    await strapi.documents(sourceUid).update({
      documentId,
      locale: otherLocale,
      data: {
        [relationField]: siblingLocalizedRelation.documentId,
        [skipFlag]: true,
      },
    });
  }
}

async function syncDoctorSlugFromEnglish({ strapi, documentId }) {
  const englishDoctor = await strapi.documents("api::doctor.doctor").findOne({
    documentId,
    locale: "en",
    fields: ["slug", "name"],
  });

  let englishSlug = englishDoctor?.slug;

  if (!englishSlug && englishDoctor?.name) {
    englishSlug = makeSlug(englishDoctor.name);

    await strapi.documents("api::doctor.doctor").update({
      documentId,
      locale: "en",
      data: {
        slug: englishSlug,
        _skipDoctorSync: true,
      },
    });
  }

  if (!englishSlug) return;

  const arabicDoctor = await strapi.documents("api::doctor.doctor").findOne({
    documentId,
    locale: "ar",
    fields: ["slug"],
  });

  if (arabicDoctor && arabicDoctor.slug !== englishSlug) {
    await strapi.documents("api::doctor.doctor").update({
      documentId,
      locale: "ar",
      data: {
        slug: englishSlug,
        _skipDoctorSync: true,
      },
    });
  }
}

module.exports = {
  register({ strapi }) {
    strapi.documents.use(async (context, next) => {
      const { uid, action, params = {} } = context;
      const { documentId, locale, data = {} } = params;

      if (!locale || !["en", "ar"].includes(locale)) {
        return next();
      }

      // ==================================================
      // DOCTOR
      // ==================================================
      if (uid === "api::doctor.doctor") {
        if (!["create", "update", "publish"].includes(action)) {
          return next();
        }

        if (data._skipDoctorSync) {
          const cleanData = { ...data };
          delete cleanData._skipDoctorSync;
          context.params.data = cleanData;
          return next();
        }

        if (params._skipSiblingPublish) {
          const cleanParams = { ...params };
          delete cleanParams._skipSiblingPublish;
          context.params = cleanParams;
          return next();
        }

        if (action === "create" || action === "update") {
          if (locale === "en" && data.name) {
            context.params.data = {
              ...data,
              slug: makeSlug(data.name),
            };
          }

          const result = await next();
          const currentDocumentId = documentId || result?.documentId;

          if (!currentDocumentId) return result;

          try {
            await syncDoctorSlugFromEnglish({
              strapi,
              documentId: currentDocumentId,
            });

            await syncLocalizedRelationField({
              strapi,
              sourceUid: "api::doctor.doctor",
              targetRelationUid: "api::clinic.clinic",
              documentId: currentDocumentId,
              locale,
              relationField: "clinic",
              incomingRelationValue: data.clinic,
              skipFlag: "_skipDoctorSync",
            });
          } catch (err) {
            strapi.log.error("Doctor sync failed:", err);
          }

          return result;
        }

        if (action === "publish") {
          const result = await next();

          try {
            if (!documentId) return result;

            await syncDoctorSlugFromEnglish({ strapi, documentId });

            await publishSiblingLocale(
              strapi,
              "api::doctor.doctor",
              documentId,
              locale,
              "_skipSiblingPublish",
            );
          } catch (err) {
            strapi.log.error("Doctor sibling publish failed:", err);
          }

          return result;
        }
      }

      // ==================================================
      // OUR DOCTORS SECTION
      // ==================================================
      if (uid === "api::our-doctors-section.our-doctors-section") {
        if (!["create", "update", "publish"].includes(action)) {
          return next();
        }

        if (data._skipOurDoctorsSectionSync) {
          const cleanData = { ...data };
          delete cleanData._skipOurDoctorsSectionSync;
          context.params.data = cleanData;
          return next();
        }

        if (params._skipOurDoctorsSectionSiblingPublish) {
          const cleanParams = { ...params };
          delete cleanParams._skipOurDoctorsSectionSiblingPublish;
          context.params = cleanParams;
          return next();
        }

        if (action === "create" || action === "update") {
          const result = await next();
          const currentDocumentId = documentId || result?.documentId;

          if (!currentDocumentId) return result;

          try {
            await syncLocalizedRelationField({
              strapi,
              sourceUid: "api::our-doctors-section.our-doctors-section",
              targetRelationUid: "api::doctor.doctor",
              documentId: currentDocumentId,
              locale,
              relationField: "doctor",
              incomingRelationValue: data.doctor,
              skipFlag: "_skipOurDoctorsSectionSync",
            });
          } catch (err) {
            strapi.log.error("Our doctors section sync failed:", err);
          }

          return result;
        }

        if (action === "publish") {
          const result = await next();

          try {
            if (!documentId) return result;

            await publishSiblingLocale(
              strapi,
              "api::our-doctors-section.our-doctors-section",
              documentId,
              locale,
              "_skipOurDoctorsSectionSiblingPublish",
            );
          } catch (err) {
            strapi.log.error(
              "Our doctors section sibling publish failed:",
              err,
            );
          }

          return result;
        }
      }

      // ==================================================
      // CLINICS / CENTERS / UNITS / MEDICAL SERVICES
      // Auto-publish sibling locale on publish
      // ==================================================
      if (AUTO_PUBLISH_SIBLING_UIDS.includes(uid)) {
        if (!["publish"].includes(action)) {
          return next();
        }

        if (params._skipDepartmentSiblingPublish) {
          const cleanParams = { ...params };
          delete cleanParams._skipDepartmentSiblingPublish;
          context.params = cleanParams;
          return next();
        }

        const result = await next();

        try {
          if (!documentId) return result;

          await publishSiblingLocale(
            strapi,
            uid,
            documentId,
            locale,
            "_skipDepartmentSiblingPublish",
          );
        } catch (err) {
          strapi.log.error(`${uid} sibling publish failed:`, err);
        }

        return result;
      }

      return next();
    });
  },
};
