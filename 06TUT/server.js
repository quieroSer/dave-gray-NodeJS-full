const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3500;

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
app.get('/*', (req, res) => {  
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
