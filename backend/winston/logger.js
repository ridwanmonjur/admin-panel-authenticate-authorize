const { createLogger, format, transports } = require('winston')

const { combine, timestamp, prettyPrint, colorize, splat } = format;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
}

const timezoned = () => {
    return new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Singapore'
    });
}

const winstonLogger = createLogger({
    levels,
    format: combine(
        timestamp({ format: timezoned }),
        splat(),
        prettyPrint()),
    transports: [
        new transports.File({
            filename: './winston/console/app.log',
            format: colorize({ all: true }),
        })
    ],
})

if (process.env.NODE_ENV !== 'production') {
    winstonLogger.add(new transports.Console({
        format: colorize({ all: true }),
    }));
}

module.exports = {
    winstonLogger
}