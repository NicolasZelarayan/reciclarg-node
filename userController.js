const connection = require('./db');
const bcrypt = require('bcryptjs');

// Obtener un usuario por su correo electrónico
function getUserByUsername(req, res) {
  const username = req.params.username;
  connection.query('SELECT * FROM user WHERE username = ?', username, (err, results) => {
    if (err) {
      console.error('Error al obtener el usuario: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Usuario no encontrado');
      return;
    }
    res.json(results[0]);
  });
}


// Obtener todos los usuarios
function getUsers(req, res) {
  connection.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error('Error al obtener los usuarios: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results);
  });
}

// Crear un nuevo usuario
function createUser(req, res) {
  const { nombre, apellido, username, password } = req.body;
  let passwordHash = bcrypt.hashSync(password, 8);
  const newUser = { nombre, apellido, username, passwordHash };
  connection.query('INSERT INTO user SET ?', newUser, (err, result) => {
    if (err) {
      console.error('Error al crear el usuario: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.send('Usuario creado exitosamente');
  });
}

// Obtener un usuario por su ID
function getUserById(req, res) {
  const userId = req.params.id;
  connection.query('SELECT * FROM user WHERE id = ?', userId, (err, results) => {
    if (err) {
      console.error('Error al obtener el usuario: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Usuario no encontrado');
      return;
    }
    res.json(results[0]);
  });
}

// Actualizar un usuario por su ID
function updateUser(req, res) {
  const userId = req.params.id;
  const { nombre, username } = req.body;
  const updatedUser = { nombre, username };
  connection.query('UPDATE user SET ? WHERE id = ?', [updatedUser, userId], (err, result) => {
    if (err) {
      console.error('Error al actualizar el usuario: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.send('Usuario actualizado exitosamente');
  });
}

// Eliminar un usuario por su ID
function deleteUser(req, res) {
  const userId = req.params.id;
  connection.query('DELETE FROM user WHERE id = ?', userId, (err, result) => {
    if (err) {
      console.error('Error al eliminar el usuario: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.send('Usuario eliminado exitosamente');
  });
}



module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByUsername,
};
