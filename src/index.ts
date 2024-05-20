import * as winston from 'winston'

const logger: winston.Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
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
                format: winston.format.simple(),
            })
        )
    },

    info(message: string, ...meta: any[]) {
        logger.info(message, this._getDefaultMeta(), ...meta)
    },

    error(message: string, ...meta: any[]) {
        logger.error(message, this._getDefaultMeta(), ...meta)
    },

    warn(message: string, ...meta: any[]) {
        logger.warn(message, this._getDefaultMeta(), ...meta)
    },

    debug(message: string, ...meta: any[]) {
        logger.debug(message, this._getDefaultMeta(), ...meta)
    },

    log(message: string, level: string = 'debug', ...meta: any[]) {
        logger.log(level, message, this._getDefaultMeta(), ...meta)
    },
    
    _getDefaultMeta() {
        return {
            timestamp: new Date().toLocaleString('nl'),
            service: process.env.SERVICE_NAME
        }
    }
}
