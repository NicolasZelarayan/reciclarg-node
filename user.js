const express = require('express');
const router = express.Router();
const userController = require('./userController');

// Rutas CRUD de usuarios
router.get('/users/:username', userController.getUserByUsername);
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);


module.exports = router;