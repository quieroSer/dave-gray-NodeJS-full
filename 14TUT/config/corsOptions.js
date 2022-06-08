const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        // la condicion || !origin deberia eliminarse cuando pase a produccion
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback( new Error('Invalid. Not allowed by cors settings'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;