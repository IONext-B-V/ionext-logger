import * as winston from 'winston'

const logger: winston.Logger = winston.createLogger({
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

export default {
    setLevel(level: string) {
        logger.configure({
            level,
        })
    },

    useLocalConfig() {
        // If we're not in production then log to the `console` with the format:
        // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
        this.setLevel('debug')
        
        logger.add(
            new winston.transports.Console({
                format: winston.format.splat(),
            })
        )
    },

    info(message: string, meta = {}) {
        logger.info(message, {
            meta: {
                ...meta,
                ...this._getDefaultMeta(),
            }
        })
    },

    error(error: string | Error, meta = {}) {
        logger.error(typeof error === 'string' ? error : error.message, {
            meta: {
                trace: typeof error !== 'string' ? error.stack.replaceAll(/\n\s+/g, ';').split(';').splice(1).join('; ') : null,
                ...meta,
                ...this._getDefaultMeta(),
            }
        })
    },

    warn(message: string, meta = {}) {
        logger.warn(message, {
            meta: {
                ...meta,
                ...this._getDefaultMeta(),
            }
        })
    },

    debug(message: string, meta = {}) {
        logger.debug(message, {
            meta: {
                ...meta,
                ...this._getDefaultMeta(),
            }
        })
    },

    log(message: string, level: string = 'debug', meta = {}) {
        logger.log(level, message, {
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
