import * as winston from 'winston'

const winstonLogger: winston.Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.Console({
            format: winston.format.splat(),
        })
    ],
})

const logger = {
    setLevel(level: string) {
        winstonLogger.configure({
            level,
        })
    },

    useLocalConfig() {
        // If we're not in production then log to the `console` with the format:
        // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
        this.setLevel('debug')
        
        winstonLogger.add(
            new winston.transports.Console({
                format: winston.format.splat(),
            })
        )
    },

    info(message: string, meta = {}) {
        winstonLogger.info(message, {
            meta: {
                ...meta,
                ...this._getDefaultMeta(),
            }
        })
    },

    error(error: string | Error, meta = {}) {
        winstonLogger.error(typeof error === 'string' ? error : error.message, {
            meta: {
                trace: typeof error !== 'string' ? error.stack.replaceAll(/\n\s+/g, ';').split(';').splice(1).join('; ') : null,
                ...meta,
                ...this._getDefaultMeta(),
            }
        })
    },

    warn(message: string, meta = {}) {
        winstonLogger.warn(message, {
            meta: {
                ...meta,
                ...this._getDefaultMeta(),
            }
        })
    },

    debug(message: string, meta = {}) {
        winstonLogger.debug(message, {
            meta: {
                ...meta,
                ...this._getDefaultMeta(),
            }
        })
    },

    log(message: string, level: string = 'debug', meta = {}) {
        winstonLogger.log(level, message, {
            meta: {
                ...meta,
                ...this._getDefaultMeta(),
            }
        })
    },
    
    _getDefaultMeta() {
        return {
            timestamp: new Date().toISOString(),
            service: process.env.SERVICE_NAME
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = logger; // CommonJS
    module.exports.default = logger; // ES Module compatibility
}
  
export default logger; 
