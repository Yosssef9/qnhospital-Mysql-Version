module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",

  {
    name: "strapi::cors",
    config: {
      origin: [
        "https://qnhospital.com.sa",
        "https://www.qnhospital.com.sa",

        "http://localhost:4174",
        "http://127.0.0.1:4174",
        "http://10.0.110.28:4174",
        "http://localhost:5173",
      ],

      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],

      headers: [
        "Content-Type",
        "Authorization",
        "Origin",
        "Accept",
        "X-Requested-With",
      ],
      credentials: true,
    },
  },

  "strapi::poweredBy",
  "strapi::query",
  "global::upload-rate-limit",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
