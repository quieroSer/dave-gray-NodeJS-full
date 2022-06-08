const whitelist = [
    'https://www.google.com',
     'http://127.0.0.1:5500',
      'http://localhost:3500'
    ]

const corsOptions = {
    origin: (origin, callback) => {
        // la condicion || !origin deberia eliminarse cuando pase a produccion
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback( new Error('Invalid. Not allowed by cors settings'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;