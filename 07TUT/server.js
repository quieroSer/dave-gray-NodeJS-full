const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500;

// custom middleware logger, necesita usar next. Los q son built-in, no lo necesitan
// fue construido, y luego fue movido al archivo logEvents, y luego exportado como logger
app.use(logger)

// aqui tiene que venir el middleware de CORS (cross origin resource sharing)
// de esta whitelist se deberian eliminar todas las cosas que tnegan que ver con localhost cuando pase a produccion
const whitelist = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3500']
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
app.use(cors(corsOptions))


// built-in middleware to handle urlencoded data
// in other words, from data:
// 'content-type => application/x-www-form-urlencoded' 
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json())

// serve static files
app.use(express.static(path.join(__dirname, '/public')))
///////////////////////////////////////////////////////////
// todo el middleware debe ser declarado antes de las rutas




app.get('^/$|index(.html)?', (req, res) => {
    // esta es una manera de servir un archivo desde un path, como respuesta a un GET de /
    //res.sendFile('./views/index.html', { root: __dirname });
    //esta es otra manera de hacer lo mismo
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get('/new-page(.html)?', (req, res) => {  
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})

app.get('/old-page(.html)?', (req, res) => {  
    res.redirect(301, 'new-page.html'); //status code 302 por defecto

})
//Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempting to load hello.html');
    next();
}, (req, res) => {
    res.send('Hello, world')
})

//encadenando route handlers
const one = (req, res, next) => {
    console.log('one')
    next()
}

const two = (req, res, next) => {
    console.log('two')
    next()
}

const three = (req, res) => {
    console.log('three')
    res.send('Finished!')
}

app.get('/chain(.html)?', [one, two, three]);



//catch-all ... esto se hace para atrapar todas las rutas q no esten definidas
// antes se habia hecho con app.get, pero eso solo atrapaba los get requests. Se cambio por
// app.all, que atrapa todos los tipos de requests a todas las rutas q no hayan sido atrabadas antes
// app.get('/*', (req, res) => {  
app.all('/*', (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } 
    else if(req.accepts('json')) {
        res.json({error: "404 Not Found"})
    }  else {
        res.type('txt').send("404 Not Found!")
    }
})

// esta parte se pone para manejar los errores de cors que tira la pagina
app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
