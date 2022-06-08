const express = require('express')
const router = express.Router()
const employeesController = require('../../controllers/employeesController')
// esto se hace cuando solo se quieren autenticar algunas rutas, y no todas
// const verifyJWT = require('../../middleware/verifyJWT')

router.route('/')
    // este es el ejemplo de cuando solamente se quiere autenticar esta ruta
    //.get(verifyJWT, employeesController.getAllEmployees)
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee)

router.route('/:id')
    .get(employeesController.getEmployee)

module.exports = router;