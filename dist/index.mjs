// src/index.ts
import * as winston from "winston";
var winstonLogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.Console({
      format: winston.format.splat()
    })
  ]
});
var logger = {
  setLevel(level) {
    winstonLogger.configure({
      level
    });
  },
  useLocalConfig() {
    this.setLevel("debug");
    winstonLogger.add(
      new winston.transports.Console({
        format: winston.format.splat()
      })
    );
  },
  info(message, meta = {}) {
    winstonLogger.info(message, {
      meta: {
        ...meta,
        ...this._getDefaultMeta()
      }
    });
  },
  error(error, meta = {}) {
    winstonLogger.error(typeof error === "string" ? error : error.message, {
      meta: {
        trace: typeof error !== "string" ? error.stack.replaceAll(/\n\s+/g, ";").split(";").splice(1).join("; ") : null,
        ...meta,
        ...this._getDefaultMeta()
      }
    });
  },
  warn(message, meta = {}) {
    winstonLogger.warn(message, {
      meta: {
        ...meta,
        ...this._getDefaultMeta()
      }
    });
  },
  debug(message, meta = {}) {
    winstonLogger.debug(message, {
      meta: {
        ...meta,
        ...this._getDefaultMeta()
      }
    });
  },
  log(message, level = "debug", meta = {}) {
    winstonLogger.log(level, message, {
      meta: {
        ...meta,
        ...this._getDefaultMeta()
      }
    });
  },
  _getDefaultMeta() {
    return {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      service: process.env.SERVICE_NAME
    };
  }
};
if (typeof module !== "undefined" && module.exports) {
  module.exports = logger;
  module.exports.default = logger;
}
var src_default = logger;
export {
  src_default as default
};
//# sourceMappingURL=index.mjs.map