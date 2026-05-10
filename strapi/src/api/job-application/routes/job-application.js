"use strict";

/**
 * job-application router
 */

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/job-applications",
      handler: "job-application.create",
      config: {
        middlewares: ["api::job-application.rate-limit"],
      },
    },
  ],
};
