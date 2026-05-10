const { RateLimit } = require("koa2-ratelimit");

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    return RateLimit.middleware({
      interval: { min: 15 },
      max: 5,
      message: "Too many job applications. Please try again later.",
      headers: true,
    })(ctx, next);
  };
};