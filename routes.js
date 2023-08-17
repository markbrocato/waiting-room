// This file was automatically added by edgio init.
// You should commit this file to source control.
import { Router } from "@edgio/core/router";
import { nextRoutes } from "@edgio/next";

export default new Router()
  // NextRoutes automatically adds routes for all Next.js pages and their assets
  .use(nextRoutes)
  .get("/", {
    edge_function: "./functions/waiting-room",
  })
  .get("/waiting-room-config.json", {
    origin: {
      set_origin: "api",
    },
    headers: {
      set_request_headers: {
        "X-Api-Key": "c12fbb80",
      },
    },
  });
