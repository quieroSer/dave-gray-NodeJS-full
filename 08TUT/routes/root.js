const express = require('express')
const router = express.Router()
const path = require('path')



router.get('^/$|index(.html)?', (req, res) => {
    // esta es una manera de servir un archivo desde un path, como respuesta a un GET de /
    //res.sendFile('./views/index.html', { root: __dirname });
    //esta es otra manera de hacer lo mismo
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
})

router.get('/new-page(.html)?', (req, res) => {  
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
})

router.get('/old-page(.html)?', (req, res) => {  
    res.redirect(301, 'new-page.html'); //status code 302 por defecto

})


module.exports = router