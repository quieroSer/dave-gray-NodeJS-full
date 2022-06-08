const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500;

// custom middleware logger, necesita usar next. Los q son built-in, no lo necesitan
// fue construido, y luego fue movido al archivo logEvents, y luego exportado como logger
app.use(logger)

app.use(cors(corsOptions))

// built-in middleware to handle urlencoded data
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json())

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')))

// routes
app.use('/', require('./routes/root'))
app.use('/employees', require('./routes/api/employees'))

///////////////////////////////////////////////////////////
// todo el middleware debe ser declarado antes de las rutas


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
