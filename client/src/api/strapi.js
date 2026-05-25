import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getDoctorParent } from "../helpers/getDoctorParent";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

export function useEntityBySlug(collection, slug, populateFields = []) {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: [collection, slug, locale, populateFields],
    queryFn: async () => {
      // await new Promise((res) => setTimeout(res, 2000000));
      const query = new URLSearchParams({
        "filters[slug][$eq]": slug,
        locale,
      });

      // dynamically add populate fields
      populateFields.forEach((field, index) => {
        query.append(`populate[${index}]`, field);
      });

      const res = await fetch(
        `${STRAPI_URL}/api/${collection}?${query.toString()}`,
      );

      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

      const json = await res.json();
      return json?.data?.[0] || null;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

export const useDepartments = (collection, page, search, pageSize = 3) => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["departments", collection, page, search, pageSize, locale],
    queryFn: async () => {
      const params = new URLSearchParams();

      // locale
      params.append("locale", locale);

      // pagination
      params.append("pagination[page]", page);
      params.append("pagination[pageSize]", pageSize);

      // fields
      params.append("fields[0]", "title");
      params.append("fields[1]", "slug");
      params.append("fields[2]", "cardDesc");

      // populate image
      params.append("populate", "image");

      // server-side search
      if (search) {
        params.append("filters[title][$containsi]", search);
      }

      const res = await fetch(
        `${STRAPI_URL}/api/${collection}?${params.toString()}`,
      );

      if (!res.ok) throw new Error("Failed to fetch " + collection);

      const json = await res.json();

      return {
        data: json.data.map((item) => ({
          id: item.id,
          title: item.title,
          cardDesc: item.cardDesc,
          slug: item.slug,
          image: item.image?.url ? STRAPI_URL + item.image.url : "",
          to: `/${collection}/${item.slug}`,
        })),
        meta: json.meta.pagination,
      };
    },

    placeholderData: (previousData) => previousData,
  });
};

export const useJoinUsSettings = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["join-us-setting", locale],
    queryFn: async () => {
      const params = new URLSearchParams();

      // locale
      params.append("locale", locale);

      // fields
      params.append("fields[0]", "isFormActive");
      params.append("fields[1]", "title");
      params.append("fields[2]", "description");
      params.append("fields[3]", "jobCampaignBadge");
      params.append("fields[4]", "jobCampaignTitle");
      params.append("fields[5]", "jobCampaignDescription");
      params.append("fields[6]", "formStartDate");
      params.append("fields[7]", "formEndDate");
      // ✅ IMPORTANT
      params.append("populate", "breadcrumbImage");

      const res = await fetch(
        `${STRAPI_URL}/api/join-us-setting?${params.toString()}`,
      );

      if (!res.ok) throw new Error("Failed to fetch join us settings");

      const json = await res.json();

      const imageUrl = json.data?.breadcrumbImage?.url
        ? STRAPI_URL + json.data.breadcrumbImage.url
        : "";

      return {
        id: json.data?.id,
        isFormActive: json.data?.isFormActive ?? false,
        formStartDate: json.data?.formStartDate || null,
        formEndDate: json.data?.formEndDate || null,
        title: json.data?.title || "",
        description: json.data?.description || "",
        jobCampaignBadge: json.data?.jobCampaignBadge || "",
        jobCampaignTitle: json.data?.jobCampaignTitle || "",
        jobCampaignDescription: json.data?.jobCampaignDescription || "",
        breadcrumbImage: imageUrl,
      };
    },
  });
};

export async function fetchHeroSlides(locale = "en") {
  const params = new URLSearchParams();

  params.append("locale", locale);
  params.append("sort[0]", "order:asc");
  params.append("fields[0]", "title");
  params.append("fields[1]", "subtitle");
  params.append("fields[2]", "tab");
  params.append("fields[3]", "order");
  params.append("populate", "media");

  const res = await fetch(
    `${STRAPI_URL}/api/homepage-hero-slides?${params.toString()}`,
  );

  if (!res.ok) throw new Error("Failed to fetch hero slides");

  const json = await res.json();

  return json.data.map((item) => {
    const media = item.media;

    return {
      id: item.id,
      title: item.title || "",
      subtitle: item.subtitle || "",
      tab: item.tab || "",
      order: item.order ?? 0,
      media: media?.url ? STRAPI_URL + media.url : "",
      mime: media?.mime || "",
      isVideo: media?.mime?.startsWith("video") || false,
    };
  });
}

export const useHeroSlides = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["hero-slides", locale],
    queryFn: () => fetchHeroSlides(locale),
    staleTime: 5 * 60 * 1000,
  });
};

export const useOurDoctorsSection = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["our-doctors-section", locale],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("locale", locale);

      params.append("fields[0]", "title");
      params.append("fields[1]", "customDescription");
      params.append("populate[doctor][fields][0]", "name");
      params.append("populate[doctor][fields][1]", "slug");
      params.append("populate[doctor][fields][2]", "experience");
      params.append("populate[doctor][fields][3]", "doctorRank");
      params.append("populate[doctor][fields][4]", "shortBio");

      params.append("populate[doctor][populate][image]", "true");
      params.append("populate[doctor][populate][clinic][fields][0]", "title");
      params.append(
        "populate[doctor][populate][clinic][fields][1]",
        "shortTitle",
      );
      params.append("populate[doctor][populate][clinic][fields][2]", "slug");
      params.append("populate[doctor][populate][unit][fields][0]", "title");
      params.append(
        "populate[doctor][populate][unit][fields][1]",
        "shortTitle",
      );
      params.append("populate[doctor][populate][unit][fields][2]", "slug");

      params.append("populate[doctor][populate][center][fields][0]", "title");
      params.append(
        "populate[doctor][populate][center][fields][1]",
        "shortTitle",
      );
      params.append("populate[doctor][populate][center][fields][2]", "slug");

      params.append(
        "populate[doctor][populate][medical_service][fields][0]",
        "title",
      );

      params.append(
        "populate[doctor][populate][medical_service][fields][1]",
        "shortTitle",
      );

      params.append(
        "populate[doctor][populate][medical_service][fields][2]",
        "slug",
      );
      const res = await fetch(
        `${STRAPI_URL}/api/our-doctors-section?${params.toString()}`,
      );

      if (!res.ok) throw new Error("Failed to fetch our doctors section");

      const json = await res.json();
      const data = json?.data;
      const doctor = data?.doctor;

      const parent = getDoctorParent(doctor);

      return {
        title: data?.title || "",
        doctorDescription: data?.customDescription || doctor?.shortBio || "",

        doctorName: doctor?.name || "",
        doctorSlug: doctor?.slug || "",
        doctorExperience: doctor?.experience || 10,
        doctorRank: doctor?.doctorRank || "",
        doctorImage: doctor?.image?.url ? STRAPI_URL + doctor.image.url : "",

        doctorSpecialty: parent?.title || "",

        doctorDepartment: parent?.shortTitle || parent?.title || "",
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};
export const useMobileAppHomeSection = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["mobile-app-home-section", locale],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("locale", locale);

      params.append("fields[0]", "title");
      params.append("fields[1]", "description");
      params.append("fields[2]", "quickInfoLabel1");
      params.append("fields[3]", "quickInfoValue1");
      params.append("fields[4]", "quickInfoLabel2");
      params.append("fields[5]", "quickInfoValue2");
      params.append("fields[6]", "floatingCardLabel");
      params.append("fields[7]", "floatingCardValue");
      params.append("fields[8]", "floatingCardDesc");
      params.append("fields[9]", "mockupTitle");
      params.append("fields[10]", "mockupDesc");

      params.append("populate[0]", "phoneImage");
      params.append("populate[1]", "features");

      const res = await fetch(
        `${STRAPI_URL}/api/mobile-app-home-section?${params.toString()}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch mobile app home section");
      }

      const json = await res.json();
      const data = json?.data;

      return {
        title: data?.title || "",
        description: data?.description || "",
        quickInfoLabel1: data?.quickInfoLabel1 || "",
        quickInfoValue1: data?.quickInfoValue1 || "",
        quickInfoLabel2: data?.quickInfoLabel2 || "",
        quickInfoValue2: data?.quickInfoValue2 || "",
        floatingCardLabel: data?.floatingCardLabel || "",
        floatingCardValue: data?.floatingCardValue || "",
        floatingCardDesc: data?.floatingCardDesc || "",
        mockupTitle: data?.mockupTitle || "",
        mockupDesc: data?.mockupDesc || "",
        phoneImage: data?.phoneImage?.url
          ? `${STRAPI_URL}${data.phoneImage.url}`
          : "",
        features:
          data?.features?.map((item, index) => ({
            id: item?.id || index,
            title: item?.title || "",
            desc: item?.desc || "",
          })) || [],
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};
export const useDoctors = (
  page,
  search,
  parentSlug,
  pageSize = 6,
  sort = ["featured:desc", "name:asc"],
) => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";
  const allValue = "all";

  return useQuery({
    queryKey: ["doctors", page, search, parentSlug, pageSize, locale, sort],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("locale", locale);
      params.append("pagination[page]", page);
      params.append("pagination[pageSize]", pageSize);

      sort.forEach((item, index) => {
        params.append(`sort[${index}]`, item);
      });

      params.append("fields[0]", "name");
      params.append("fields[1]", "slug");
      params.append("fields[2]", "experience");
      params.append("fields[3]", "featured");
      params.append("fields[4]", "doctorRank");
      params.append("fields[5]", "gender");

      params.append("populate[0]", "image");
      params.append("populate[1]", "clinic");
      params.append("populate[2]", "unit");
      params.append("populate[3]", "center");
      params.append("populate[4]", "medical_service");

      if (search) {
        params.append("filters[$or][0][name][$containsi]", search);
        params.append("filters[$or][1][clinic][title][$containsi]", search);
        params.append(
          "filters[$or][2][clinic][shortTitle][$containsi]",
          search,
        );
        params.append("filters[$or][3][unit][title][$containsi]", search);
        params.append("filters[$or][4][unit][shortTitle][$containsi]", search);
        params.append("filters[$or][5][center][title][$containsi]", search);
        params.append(
          "filters[$or][6][center][shortTitle][$containsi]",
          search,
        );
        params.append(
          "filters[$or][7][medical_service][title][$containsi]",
          search,
        );
        params.append(
          "filters[$or][8][medical_service][shortTitle][$containsi]",
          search,
        );
      }

      if (parentSlug && parentSlug !== allValue) {
        params.append(
          "filters[$and][0][$or][0][clinic][slug][$eq]",
          parentSlug,
        );

        params.append("filters[$and][0][$or][1][unit][slug][$eq]", parentSlug);

        params.append(
          "filters[$and][0][$or][2][center][slug][$eq]",
          parentSlug,
        );

        params.append(
          "filters[$and][0][$or][3][medical_service][slug][$eq]",
          parentSlug,
        );
      }

      const res = await fetch(`${STRAPI_URL}/api/doctors?${params.toString()}`);

      if (!res.ok) throw new Error("Failed to fetch doctors");

      const json = await res.json();

      return {
        data:
          json.data?.map((item) => {
            const parent = getDoctorParent(item);

            return {
              id: item.id,
              documentId: item.documentId,
              name: item.name || "",
              slug: item.slug || "",
              description: parent.cardDesc || "",
              experience: item.experience || "",
              doctorRank: item.doctorRank || "",
              gender: item.gender || "male",
              featured: item.featured || false,
              image: item.image?.url
                ? STRAPI_URL + item.image.url
                : item.gender === "female"
                  ? "/images/female-doctor-default.jpeg"
                  : "/images/doctor-defalut.jpeg",
              specialty: parent.title || "",
              department: parent.shortTitle || parent.title || "",
              parentSlug: parent.slug || "",
              parentType: parent.type || "",
              clinicSlug: item.clinic?.slug || "",
              to: `/our-doctors/${item.slug || item.id}`,
            };
          }) || [],
        meta: json.meta?.pagination || null,
      };
    },
    placeholderData: (previousData) => previousData,
  });
};
export const useDoctorParents = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["doctor-parents", locale],

    queryFn: async () => {
      const buildParams = () => {
        const params = new URLSearchParams();

        params.append("locale", locale);
        params.append("pagination[page]", 1);
        params.append("pagination[pageSize]", 200);

        params.append("fields[0]", "title");
        params.append("fields[1]", "shortTitle");
        params.append("fields[2]", "slug");

        return params.toString();
      };

      const [clinicsRes, unitsRes, centersRes, medicalServicesRes] =
        await Promise.all([
          fetch(`${STRAPI_URL}/api/clinics?${buildParams()}`),
          fetch(`${STRAPI_URL}/api/units?${buildParams()}`),
          fetch(`${STRAPI_URL}/api/centers?${buildParams()}`),
          fetch(`${STRAPI_URL}/api/medical-services?${buildParams()}`),
        ]);

      if (!clinicsRes.ok) throw new Error("Failed to fetch clinics");
      if (!unitsRes.ok) throw new Error("Failed to fetch units");
      if (!centersRes.ok) throw new Error("Failed to fetch centers");
      if (!medicalServicesRes.ok) {
        throw new Error("Failed to fetch medical services");
      }

      const [clinicsJson, unitsJson, centersJson, medicalServicesJson] =
        await Promise.all([
          clinicsRes.json(),
          unitsRes.json(),
          centersRes.json(),
          medicalServicesRes.json(),
        ]);

      const mapItems = (items, type) =>
        items?.map((item) => ({
          type,
          title: item.title || "",
          shortTitle: item.shortTitle || "",
          slug: item.slug || "",
        })) || [];

      return [
        ...mapItems(clinicsJson.data, "clinic"),
        ...mapItems(unitsJson.data, "unit"),
        ...mapItems(centersJson.data, "center"),
        ...mapItems(medicalServicesJson.data, "medical-service"),
      ];
    },

    staleTime: 5 * 60 * 1000,
  });
};
export const useDoctorBySlug = (slug) => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["doctor-by-slug", slug, locale],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("locale", locale);
      params.append("filters[slug][$eq]", slug);

      params.append("fields[0]", "name");
      params.append("fields[1]", "slug");
      params.append("fields[2]", "experience");
      params.append("fields[3]", "featured");
      params.append("fields[4]", "doctorRank");
      params.append("fields[5]", "shortBio");
      params.append("fields[6]", "gender");

      params.append("populate[0]", "image");
      params.append("populate[1]", "clinic");
      params.append("populate[2]", "unit");
      params.append("populate[3]", "center");
      params.append("populate[4]", "medical_service");
      params.append("populate[5]", "specializations");
      params.append("populate[6]", "qualifications");

      const res = await fetch(`${STRAPI_URL}/api/doctors?${params.toString()}`);

      if (!res.ok) throw new Error("Failed to fetch doctor profile");

      const json = await res.json();
      const item = json?.data?.[0];

      if (!item) return null;

      const parent = getDoctorParent(item);

      return {
        id: item.id,
        documentId: item.documentId,
        name: item.name || "",
        slug: item.slug || "",
        experience: item.experience || 0,
        featured: item.featured || false,
        doctorRank: item.doctorRank || "",
        shortBio: item.shortBio || "",
        gender: item.gender || "male",
        image: item.image?.url ? STRAPI_URL + item.image.url : "",

        parent,

        clinic: item.clinic || null,
        unit: item.unit || null,
        center: item.center || null,
        medicalService: item.medical_service || null,

        specializations:
          item.specializations?.map((sp, index) => ({
            id: sp.id || index,
            title: sp.title || "",
          })) || [],

        qualifications:
          item.qualifications?.map((q, index) => ({
            id: q.id || index,
            title: q.title || "",
          })) || [],
      };
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useWebsiteLinks = () => {
  return useQuery({
    queryKey: ["website-links"],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("populate[0]", "socialMediaLinks");
      params.append("populate[1]", "mobileAppLinks");
      params.append("populate[2]", "contactInfo");

      const res = await fetch(
        `${STRAPI_URL}/api/website-link?${params.toString()}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch website links");
      }

      const json = await res.json();
      const data = json?.data;

      return {
        socialMediaLinks: {
          youtube: data?.socialMediaLinks?.youtube || "",
          instagram: data?.socialMediaLinks?.instagram || "",
          facebook: data?.socialMediaLinks?.facebook || "",
          twitter: data?.socialMediaLinks?.twitter || "",
        },
        mobileAppLinks: {
          android: data?.mobileAppLinks?.mobileAppAndroid || "",
          ios: data?.mobileAppLinks?.mobileAppIos || "",
        },
        contactInfo: {
          phone: data?.contactInfo?.phone || "",
          email: data?.contactInfo?.email || "",
          callCenterPhone: data?.contactInfo?.CallCenterPhone || "",
        },
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};

// export const useNewsAchievementsHomeSection = () => {
//   const { i18n } = useTranslation();
//   const locale = i18n.language || "en";
//   console.log("CURRENT LANGUAGE:", i18n.language);
//   console.log("CURRENT LOCALE SENT TO STRAPI:", locale);
//   return useQuery({
//     queryKey: ["news-achievements-home-section", locale],
//     queryFn: async () => {
//       const params = new URLSearchParams();

//       params.append("locale", locale);

//       // Featured News
//       params.append("populate[featuredNews][fields][0]", "title");
//       params.append("populate[featuredNews][fields][1]", "description");
//       params.append("populate[featuredNews][fields][2]", "publishedDate");
//       params.append("populate[featuredNews][populate]", "coverImage");

//       // Featured Achievements
//       params.append("populate[featuredAchievements][fields][0]", "title");
//       params.append("populate[featuredAchievements][fields][1]", "description");
//       params.append(
//         "populate[featuredAchievements][fields][2]",
//         "publishedDate",
//       );
//       params.append("populate[featuredAchievements][populate]", "coverImage");

//       const res = await fetch(
//         `${STRAPI_URL}/api/news-achievements-home-section?${params.toString()}`,
//       );

//       if (!res.ok) {
//         throw new Error("Failed to fetch home news & achievements section");
//       }

//       const json = await res.json();
//       const data = json?.data;
//       console.log("useNewsAchievementsHomeSection data", data);
//       return {
//         featuredNews: (data?.featuredNews || []).slice(0, 4).map((item) => ({
//           id: item.id,
//           title: item.title || "",
//           description: item.description || "",
//           publishedDate: item.publishedDate || "",
//           coverImage: item.coverImage?.url
//             ? `${STRAPI_URL}${item.coverImage.url}`
//             : "",
//         })),

//         featuredAchievements: (data?.featuredAchievements || [])
//           .slice(0, 4)
//           .map((item) => ({
//             id: item.id,
//             title: item.title || "",
//             description: item.description || "",
//             publishedDate: item.publishedDate || "",
//             coverImage: item.coverImage?.url
//               ? `${STRAPI_URL}${item.coverImage.url}`
//               : "",
//           })),
//       };
//     },
//     staleTime: 5 * 60 * 1000,
//   });
// };
export const useNewsAchievementsHomeSection = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["news-achievements-home-section", locale],
    queryFn: async () => {
      const newsParams = new URLSearchParams();
      newsParams.append("locale", locale);
      newsParams.append("pagination[page]", 1);
      newsParams.append("pagination[pageSize]", 4);
      newsParams.append("sort[0]", "publishedDate:desc");
      newsParams.append("fields[0]", "title");
      newsParams.append("fields[1]", "description");
      newsParams.append("fields[2]", "publishedDate");
      newsParams.append("populate", "coverImage");

      const achievementsParams = new URLSearchParams();
      achievementsParams.append("locale", locale);
      achievementsParams.append("pagination[page]", 1);
      achievementsParams.append("pagination[pageSize]", 4);
      achievementsParams.append("sort[0]", "publishedDate:desc");
      achievementsParams.append("fields[0]", "title");
      achievementsParams.append("fields[1]", "description");
      achievementsParams.append("fields[2]", "publishedDate");
      achievementsParams.append("populate", "coverImage");

      const [newsRes, achievementsRes] = await Promise.all([
        fetch(`${STRAPI_URL}/api/news?${newsParams.toString()}`),
        fetch(
          `${STRAPI_URL}/api/achievements?${achievementsParams.toString()}`,
        ),
      ]);

      if (!newsRes.ok) throw new Error("Failed to fetch news");
      if (!achievementsRes.ok) throw new Error("Failed to fetch achievements");

      const newsJson = await newsRes.json();
      const achievementsJson = await achievementsRes.json();

      const mapItem = (item) => ({
        id: item.id,
        title: item.title || "",
        description: item.description || "",
        publishedDate: item.publishedDate || "",
        coverImage: item.coverImage?.url
          ? `${STRAPI_URL}${item.coverImage.url}`
          : "",
      });

      return {
        featuredNews: newsJson?.data?.map(mapItem) || [],
        featuredAchievements: achievementsJson?.data?.map(mapItem) || [],
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useNews = (page = 1, search = "", pageSize = 8) => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["news", page, search, pageSize, locale],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("locale", locale);
      params.append("pagination[page]", page);
      params.append("pagination[pageSize]", pageSize);
      params.append("sort[0]", "publishedDate:desc");

      params.append("fields[0]", "title");
      params.append("fields[1]", "publishedDate");
      params.append("fields[2]", "description");
      params.append("populate", "coverImage");

      if (search) {
        params.append("filters[title][$containsi]", search);
      }

      const res = await fetch(`${STRAPI_URL}/api/news?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch news");

      const json = await res.json();

      return {
        data:
          json?.data?.map((item) => ({
            id: item.id,
            title: item.title || "",
            description: item.description || "",
            publishedDate: item.publishedDate || "",
            coverImage: item.coverImage?.url
              ? `${STRAPI_URL}${item.coverImage.url}`
              : "",
          })) || [],
        meta: json?.meta?.pagination || null,
      };
    },
    placeholderData: (prev) => prev,
  });
};

export const useAchievements = (page = 1, search = "", pageSize = 8) => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["achievements", page, search, pageSize, locale],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("locale", locale);
      params.append("pagination[page]", page);
      params.append("pagination[pageSize]", pageSize);
      params.append("sort[0]", "publishedDate:desc");

      params.append("fields[0]", "title");
      params.append("fields[1]", "publishedDate");
      params.append("fields[2]", "description");
      params.append("populate", "coverImage");

      if (search) {
        params.append("filters[title][$containsi]", search);
      }

      const res = await fetch(
        `${STRAPI_URL}/api/achievements?${params.toString()}`,
      );
      if (!res.ok) throw new Error("Failed to fetch achievements");

      const json = await res.json();

      return {
        data:
          json?.data?.map((item) => ({
            id: item.id,
            title: item.title || "",
            description: item.description || "",
            publishedDate: item.publishedDate || "",
            coverImage: item.coverImage?.url
              ? `${STRAPI_URL}${item.coverImage.url}`
              : "",
          })) || [],
        meta: json?.meta?.pagination || null,
      };
    },
    placeholderData: (prev) => prev,
  });
};

export const useHeroSection2 = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["hero-section-2", locale],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("locale", locale);
      params.append("fields[0]", "badgeText");
      params.append("fields[1]", "title");
      params.append("fields[2]", "description");
      params.append("fields[3]", "primaryButtonText");
      params.append("fields[4]", "primaryButtonLink");
      params.append("fields[5]", "bottomTitle");
      params.append("fields[6]", "bottomSubtitle");
      params.append("fields[7]", "trustChips");
      params.append("fields[8]", "stats");
      params.append("populate", "image");

      const res = await fetch(
        `${STRAPI_URL}/api/hero-section-2?${params.toString()}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch hero section 2");
      }

      const json = await res.json();
      const data = json?.data;

      if (!data) return null;

      return {
        badgeText: data?.badgeText || "",
        title: data?.title || "",
        description: data?.description || "",
        primaryButtonText: data?.primaryButtonText || "",
        primaryButtonLink: data?.primaryButtonLink || "",
        bottomTitle: data?.bottomTitle || "",
        bottomSubtitle: data?.bottomSubtitle || "",
        trustChips: data?.trustChips || [],
        stats: data?.stats || [],
        image: data?.image?.url ? `${STRAPI_URL}${data.image.url}` : "",
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};
export const useHospitalAccreditations = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["hospital-accreditations", locale],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("locale", locale);
      params.append("pagination[page]", 1);
      params.append("pagination[pageSize]", 50);
      params.append("sort[0]", "order:asc");

      params.append("fields[0]", "title");
      params.append("fields[1]", "slug");
      params.append("fields[2]", "description");
      params.append("fields[3]", "order");
      params.append("fields[4]", "isActive");

      params.append("populate[0]", "certificateImage");
      params.append("populate[1]", "iconImage");

      params.append("filters[isActive][$eq]", "true");

      const res = await fetch(
        `${STRAPI_URL}/api/hospital-accreditations?${params.toString()}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch hospital accreditations");
      }

      const json = await res.json();

      return (
        json?.data?.map((item) => ({
          id: item.id,
          documentId: item.documentId,
          title: item.title || "",
          slug: item.slug || "",
          description: item.description || "",
          order: item.order || 0,
          certificateImage: item.certificateImage?.url
            ? `${STRAPI_URL}${item.certificateImage.url}`
            : "",
          iconImage: item.iconImage?.url
            ? `${STRAPI_URL}${item.iconImage.url}`
            : "",
        })) || []
      );
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useGlobalSearch = (search = "") => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["global-search", search, locale],
    enabled: search.trim().length >= 2,
    queryFn: async () => {
      const q = search.trim();

      const buildParams = (titleField = "title") => {
        const params = new URLSearchParams();
        params.append("locale", locale);
        params.append("pagination[page]", 1);
        params.append("pagination[pageSize]", 5);
        params.append(`filters[${titleField}][$containsi]`, q);
        params.append("fields[0]", titleField);
        params.append("fields[1]", "slug");
        return params;
      };

      const requests = [
        {
          type: "Doctor",
          url: `${STRAPI_URL}/api/doctors?${buildParams("name")}`,
          to: (item) => `/our-doctors/${item.slug}`,
          title: (item) => item.name,
        },
        {
          type: "Clinic",
          url: `${STRAPI_URL}/api/clinics?${buildParams("title")}`,
          to: (item) => `/clinics/${item.slug}`,
          title: (item) => item.title,
        },
        {
          type: "Center",
          url: `${STRAPI_URL}/api/centers?${buildParams("title")}`,
          to: (item) => `/centers/${item.slug}`,
          title: (item) => item.title,
        },
        {
          type: "Unit",
          url: `${STRAPI_URL}/api/units?${buildParams("title")}`,
          to: (item) => `/units/${item.slug}`,
          title: (item) => item.title,
        },
        {
          type: "Service",
          url: `${STRAPI_URL}/api/medical-services?${buildParams("title")}`,
          to: (item) => `/medical-services/${item.slug}`,
          title: (item) => item.title,
        },
        {
          type: "News",
          url: `${STRAPI_URL}/api/news?${buildParams("title")}`,
          to: () => `/news-achievements?tab=news&page=1`,
          title: (item) => item.title,
        },
        {
          type: "Achievement",
          url: `${STRAPI_URL}/api/achievements?${buildParams("title")}`,
          to: () => `/news-achievements?tab=achievements&page=1`,
          title: (item) => item.title,
        },
      ];

      const results = await Promise.allSettled(
        requests.map(async (req) => {
          const res = await fetch(req.url);
          if (!res.ok) return [];

          const json = await res.json();

          return (
            json?.data?.map((item) => ({
              id: `${req.type}-${item.id}`,
              title: req.title(item),
              type: req.type,
              to: req.to(item),
            })) || []
          );
        }),
      );

      return results.flatMap((result) =>
        result.status === "fulfilled" ? result.value : [],
      );
    },
    staleTime: 60 * 1000,
  });
};

export const useAboutQnhSection = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["about-qnh-section-home-page", locale],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("locale", locale);

      params.append("fields[0]", "badge");
      params.append("fields[1]", "title");
      params.append("fields[2]", "description");
      params.append("fields[3]", "imageAlt");
      params.append("fields[4]", "hospitalName");
      params.append("fields[5]", "establishedLabel");
      params.append("fields[6]", "establishedYear");
      params.append("fields[7]", "establishedDescription");
      params.append("fields[8]", "bedValue");
      params.append("fields[9]", "bedLabel");
      params.append("fields[10]", "emergencyValue");
      params.append("fields[11]", "emergencyLabel");

      params.append("populate[0]", "image");
      params.append("populate[1]", "highlights");
      params.append("populate[2]", "featurePoints");

      const res = await fetch(
        `${STRAPI_URL}/api/about-qnh-section-home-page?${params.toString()}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch about QNH section");
      }

      const json = await res.json();
      const data = json?.data;

      if (!data) return null;

      return {
        badge: data.badge || "",
        title: data.title || "",
        description: data.description || "",
        imageAlt: data.imageAlt || "",
        hospitalName: data.hospitalName || "",

        establishedLabel: data.establishedLabel || "",
        establishedYear: data.establishedYear || "",
        establishedDescription: data.establishedDescription || "",

        bedValue: data.bedValue || "",
        bedLabel: data.bedLabel || "",
        emergencyValue: data.emergencyValue || "",
        emergencyLabel: data.emergencyLabel || "",

        image: data.image?.url ? `${STRAPI_URL}${data.image.url}` : "",

        highlights:
          data.highlights?.map((item, index) => ({
            id: item.id || index,
            iconKey: item.iconKey || "heartPulse",
            title: item.title || "",
            desc: item.desc || "",
          })) || [],

        featurePoints:
          data.featurePoints?.map((item, index) => ({
            id: item.id || index,
            text: item.text || "",
          })) || [],
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const usePrivacyPolicy = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["privacy-policy", locale],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("locale", locale);

      params.append("fields[0]", "title");
      params.append("fields[1]", "subtitle");
      params.append("fields[2]", "lastUpdated");
      params.append("fields[3]", "intro");
      params.append("fields[4]", "contactTitle");
      params.append("fields[5]", "contactText");
      params.append("fields[6]", "contactPhone");
      params.append("fields[7]", "contactServiceLabel");

      params.append("populate[breadcrumbImage]", "true");
      params.append("populate[sections][populate][points]", "true");

      const res = await fetch(
        `${STRAPI_URL}/api/privacy-policy?${params.toString()}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch privacy policy");
      }

      const json = await res.json();
      const data = json?.data;

      return {
        title: data?.title || "",
        subtitle: data?.subtitle || "",
        lastUpdated: data?.lastUpdated || "",
        intro: data?.intro || "",
        contactTitle: data?.contactTitle || "",
        contactText: data?.contactText || "",
        contactPhone: data?.contactPhone || "",
        contactServiceLabel: data?.contactServiceLabel || "",
        breadcrumbImage: data?.breadcrumbImage?.url
          ? `${STRAPI_URL}${data.breadcrumbImage.url}`
          : "/images/about.jpg",

        sections:
          data?.sections
            ?.slice()
            ?.sort((a, b) => (a.order || 0) - (b.order || 0))
            ?.map((item, index) => ({
              id: item.id || index,
              title: item.title || "",
              iconKey: item.iconKey || "fileText",
              order: item.order || index,
              points:
                item?.points?.map((point, pointIndex) => ({
                  id: point.id || pointIndex,
                  text: point.text || "",
                })) || [],
            })) || [],
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useOurDoctorsPageSetting = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["our-doctors-page-setting", locale],

    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("locale", locale);

      params.append("fields[0]", "heroTitle");
      params.append("fields[1]", "heroDescription");
      params.append("fields[2]", "highlightTitle");
      params.append("fields[3]", "highlightDescription");
      params.append("fields[4]", "gridTitle");

      params.append("populate", "breadcrumbImage");

      const res = await fetch(
        `${STRAPI_URL}/api/our-doctors-page-setting?${params.toString()}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch doctors page settings");
      }

      const json = await res.json();
      const data = json?.data;

      return {
        heroTitle: data?.heroTitle || "",
        heroDescription: data?.heroDescription || "",

        highlightTitle: data?.highlightTitle || "",
        highlightDescription: data?.highlightDescription || "",

        gridTitle: data?.gridTitle || "",

        breadcrumbImage: data?.breadcrumbImage?.url
          ? `${STRAPI_URL}${data.breadcrumbImage.url}`
          : "/images/about-us-header.jpg",
      };
    },

    staleTime: 5 * 60 * 1000,
  });
};
export const useMedicalDepartmentsPageSetting = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["medical-departments-page-setting", locale],

    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("locale", locale);
      params.append("fields[0]", "description");
      params.append("populate", "breadcrumbImage");

      const res = await fetch(
        `${STRAPI_URL}/api/medical-departments-page-setting?${params.toString()}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch medical departments page setting");
      }

      const json = await res.json();
      const data = json?.data;

      return {
        description: data?.description || "",
        breadcrumbImage: data?.breadcrumbImage?.url
          ? `${STRAPI_URL}${data.breadcrumbImage.url}`
          : "/images/about-us-header.jpg",
      };
    },

    staleTime: 5 * 60 * 1000,
  });
};
export const useMissionVisionPage = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";

  return useQuery({
    queryKey: ["mission-vision-page", locale],

    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("locale", locale);

      // text fields
      params.append("fields[0]", "missionTitle");
      params.append("fields[1]", "missionDescription");
      params.append("fields[2]", "visionTitle");
      params.append("fields[3]", "visionDescription");

      // images
      params.append("populate[0]", "breadcrumbImage");
      params.append("populate[1]", "missionImage");
      params.append("populate[2]", "visionImage");

      const res = await fetch(
        `${STRAPI_URL}/api/mission-vision-page?${params.toString()}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch mission vision page");
      }

      const json = await res.json();
      const data = json?.data;

      return {
        breadcrumbImage: data?.breadcrumbImage?.url
          ? `${STRAPI_URL}${data.breadcrumbImage.url}`
          : "/images/about-us-header.jpg",

        missionImage: data?.missionImage?.url
          ? `${STRAPI_URL}${data.missionImage.url}`
          : "",

        missionTitle: data?.missionTitle || "",

        missionDescription: data?.missionDescription || "",

        visionImage: data?.visionImage?.url
          ? `${STRAPI_URL}${data.visionImage.url}`
          : "",

        visionTitle: data?.visionTitle || "",

        visionDescription: data?.visionDescription || "",
      };
    },

    staleTime: 5 * 60 * 1000,
  });
};
