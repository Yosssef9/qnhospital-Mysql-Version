"use strict";

const { RateLimit } = require("koa2-ratelimit");

module.exports = () => {
  return async (ctx, next) => {
    // Protect only upload endpoint
    if (ctx.path === "/api/upload" && ctx.method === "POST") {
      return RateLimit.middleware({
        interval: { min: 15 },
        max: 10,
        message: "Too many upload requests. Please try again later.",
        headers: true,
      })(ctx, next);
    }

    await next();
  };
};
