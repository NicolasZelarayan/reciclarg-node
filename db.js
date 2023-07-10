const mysql = require('mysql');

// Configura la conexión con la base de datos
const connection = mysql.createConnection({
  host: 'reciclarg.mysql.database.azure.com',
  port: 3306,
  user: 'chipoeros',
  password: 'Reciclarg.',
  database: 'reciclargdb',
});

// Conéctate a la base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = connection;
