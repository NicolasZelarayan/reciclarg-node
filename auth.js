const express = require('express');
const router = express.Router();
const authController = require('./authController');

// Ruta para el inicio de sesión
router.post('/auth', authController.login);


module.exports = router;
