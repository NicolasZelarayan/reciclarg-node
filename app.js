const express = require('express');
const bodyParser = require('body-parser');
const markersController = require('./markersController');
const userController = require('./userController');
const zonesController = require('./zonesController');
const nosotrosController = require('./nosotrosController');
const connection = require('./db');
const bcryptjs = require('bcryptjs');

const app = express();

// Configuración del body-parser
app.use(bodyParser.json());

// Middleware para configurar los encabezados CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Rutas para el CRUD de marcadores
app.get('/markers', markersController.getMarkers);
app.get('/markers/:id', markersController.getMarkerById);
app.post('/markers', markersController.createMarker);
app.put('/markers/:id', markersController.updateMarker);
app.delete('/markers/:id', markersController.deleteMarker);

// Rutas para el CRUD de usuarios
app.get('/users', userController.getUsers);
app.get('/users/:id', userController.getUserById);
app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

// Rutas para el CRUD de zonas
app.get('/zones', zonesController.getZones);
app.get('/zones/:id', zonesController.getZoneById);
app.post('/zones', zonesController.createZone);
app.put('/zones/:id', zonesController.updateZone);
app.delete('/zones/:id', zonesController.deleteZone);

// Rutas para el CRUD de nosotros
app.get('/nosotros', nosotrosController.getNosotros);
app.get('/nosotros/:id', nosotrosController.getNosotrosById);
app.post('/nosotros', nosotrosController.createNosotros);
app.put('/nosotros/:id', nosotrosController.updateNosotros);
app.delete('/nosotros/:id', nosotrosController.deleteNosotros);

//ruta auth
app.post('/auth', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    try {
      const passwordHash = await bcryptjs.hash(password, 8); // Genera automáticamente una sal

      connection.query('SELECT * FROM user WHERE username = ?', [username], async (error, results) => {
        if (results.length === 0 || !(await bcryptjs.compare(password, results[0].passwordHash))) {
          res.status(401).send('Usuario o contraseña incorrectos'); // Código de estado 401 para autenticación fallida
        } else {
          res.status(200).send('Bienvenido'); // Código de estado 200 para autenticación exitosa
        }
        res.end();
      });
    } catch (error) {
      console.error('Error al realizar el hash de la contraseña:', error);
      res.status(500).send('Error al autenticar al usuario'); // Código de estado 500 para error interno del servidor
      res.end();
    }
  } else {
    res.status(400).send('Por favor ingrese usuario y contraseña'); // Código de estado 400 para solicitud incorrecta
    res.end();
  }
});


// Puerto en el que se ejecutará la aplicación
const port = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});