const connection = require('./db');

// Obtener todas las personas de la organización
function getNosotros(req, res) {
  connection.query('SELECT * FROM nosotros', (err, results) => {
    if (err) {
      console.error('Error al obtener las personas: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results);
  });
}

// Crear una nueva persona
function createNosotros(req, res) {
  const { nombre, apellido, puesto, github, linkedin, twitter, foto_id } = req.body;
  const newNosotros = { nombre, apellido, puesto, github, linkedin, twitter, foto_id };
  connection.query('INSERT INTO nosotros SET ?', newNosotros, (err, result) => {
    if (err) {
      console.error('Error al crear la persona: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.send('Persona creada exitosamente');
  });
}

// Obtener una persona por su ID
function getNosotrosById(req, res) {
  const nosotrosId = req.params.id;
  connection.query('SELECT * FROM nosotros WHERE id = ?', nosotrosId, (err, results) => {
    if (err) {
      console.error('Error al obtener la persona: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Persona no encontrada');
      return;
    }
    res.json(results[0]);
  });
}

// Actualizar una persona por su ID
function updateNosotros(req, res) {
  const nosotrosId = req.params.id;
  const { nombre, apellido, cargo, github, linkedin, twitter, foto } = req.body;
  const updatedNosotros = { nombre, apellido, cargo, github, linkedin, twitter, foto };
  connection.query('UPDATE nosotros SET ? WHERE id = ?', [updatedNosotros, nosotrosId], (err, result) => {
    if (err) {
      console.error('Error al actualizar la persona: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.send('Persona actualizada exitosamente');
  });
}

// Eliminar una persona por su ID
function deleteNosotros(req, res) {
  const nosotrosId = req.params.id;
  connection.query('DELETE FROM nosotros WHERE id = ?', nosotrosId, (err, result) => {
    if (err) {
      console.error('Error al eliminar la persona: ', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.send('Persona eliminada exitosamente');
  });
}

module.exports = {
  getNosotros,
  createNosotros,
  getNosotrosById,
  updateNosotros,
  deleteNosotros,
};
