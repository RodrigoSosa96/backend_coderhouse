import winston, { Logform } from 'winston'

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

//Si está en modo producción, solo se muestra el error y warnings en consola
const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

winston.addColors(colors)

const format = winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),
    // winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp}: ${info.message}`,
    ),
)

const transports = [
    new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize({all: true}), format),
    }),
    new winston.transports.File({
        filename: 'logs/warn.log',
        level: 'warn',
        format: format,
    }),
    new winston.transports.File({
        filename: 'logs/combined.log',
        level: 'error',
        format: format,
    }),
]

const Logger = winston.createLogger({

    level: level(),
    levels,
    // format,
    transports,
})

export default Logger