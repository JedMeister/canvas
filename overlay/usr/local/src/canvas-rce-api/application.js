"use strict";

const express = require("express");
const _stats = require("./middleware/stats");
const withMiddleware = require("./middleware");
const _env = require("./env");
const _routes = require("./routes");

if (typeof(PhusionPassenger) !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}

function inject(provide) {
  return [_env, _routes, provide(console), provide(express()), _stats];
}

function init(env, routes, logger, app, stats) {
  app.use(stats.handle);
  withMiddleware(app, wrappedApp => routes(wrappedApp));
  const port = env.get("PORT", () => 3000);
  return {
    listen() {
        var server = null;
     if (typeof(PhusionPassenger) !== 'undefined') {
         logger.log('we are running in phusion');
         server = app.listen('passenger');
        } else {
                logger.log('we are running outside of phusion, on port ' + port);
                server = app.listen(port);
        }
      return server;
    }
  };
}

module.exports = { inject, init, singleton: true };
