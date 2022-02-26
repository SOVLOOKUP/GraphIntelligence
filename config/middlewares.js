module.exports = [
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      jsonLimit: "2048mb",
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
