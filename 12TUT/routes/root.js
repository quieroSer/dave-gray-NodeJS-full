const express = require('express')
const router = express.Router()
const path = require('path')



router.get('^/$|index(.html)?', (req, res) => {
    // esta es una manera de servir un archivo desde un path, como respuesta a un GET de /
    //res.sendFile('./views/index.html', { root: __dirname });
    //esta es otra manera de hacer lo mismo
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
})


module.exports = router