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
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" })
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
        format: winston.format.simple()
      })
    );
  },
  info(message, ...meta) {
    logger.info(message, this._getDefaultMeta(), ...meta);
  },
  error(message, ...meta) {
    logger.error(message, this._getDefaultMeta(), ...meta);
  },
  warn(message, ...meta) {
    logger.warn(message, this._getDefaultMeta(), ...meta);
  },
  debug(message, ...meta) {
    logger.debug(message, this._getDefaultMeta(), ...meta);
  },
  log(message, level = "debug", ...meta) {
    logger.log(level, message, this._getDefaultMeta(), ...meta);
  },
  _getDefaultMeta() {
    return {
      timestamp: (/* @__PURE__ */ new Date()).toLocaleString("nl"),
      service: process.env.SERVICE_NAME
    };
  }
};
export {
  src_default as default
};
//# sourceMappingURL=index.mjs.map