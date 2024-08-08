// src/index.ts
import * as winston from "winston";
var logger = winston.createLogger({
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
var src_default = {
  setLevel(level) {
    logger.configure({
      level
    });
  },
  useLocalConfig() {
    this.setLevel("debug");
    logger.add(
      new winston.transports.Console({
        format: winston.format.splat()
      })
    );
  },
  info(message, meta = {}) {
    logger.info(message, {
      meta: {
        ...meta,
        ...this._getDefaultMeta()
      }
    });
  },
  error(error, meta = {}) {
    logger.error(typeof error === "string" ? error : error.message, {
      meta: {
        trace: typeof error !== "string" ? error.stack.replaceAll(/\n\s+/g, ";").split(";").splice(1).join("; ") : null,
        ...meta,
        ...this._getDefaultMeta()
      }
    });
  },
  warn(message, meta = {}) {
    logger.warn(message, {
      meta: {
        ...meta,
        ...this._getDefaultMeta()
      }
    });
  },
  debug(message, meta = {}) {
    logger.debug(message, {
      meta: {
        ...meta,
        ...this._getDefaultMeta()
      }
    });
  },
  log(message, level = "debug", meta = {}) {
    logger.log(level, message, {
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
export {
  src_default as default
};
//# sourceMappingURL=index.mjs.map