var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var winston = __toESM(require("winston"));
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
//# sourceMappingURL=index.js.map