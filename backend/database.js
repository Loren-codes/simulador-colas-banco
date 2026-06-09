const mysql = require('mysql2');

// Paso 1: Conectar sin base de datos para crearla
const dbInit = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

dbInit.query('CREATE DATABASE IF NOT EXISTS simulador_banco', (err) => {
  if (err) {
    console.log('❌ Error creando base de datos:', err.message);
  } else {
    console.log('✅ Base de datos simulador_banco lista');
  }
  dbInit.end();
});

// Paso 2: Conectar con la base de datos ya creada
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'simulador_banco'
});

db.connect((err) => {
  if (err) {
    console.log('❌ Error conectando a MySQL:', err.message);
    return;
  }
  console.log('✅ Conectado a MySQL correctamente');
  crearTablas();
});

function crearTablas() {
  const clientes = `
    CREATE TABLE IF NOT EXISTS clientes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ticket VARCHAR(10) NOT NULL,
      nombre VARCHAR(100) NOT NULL,
      hora_llegada DATETIME DEFAULT CURRENT_TIMESTAMP,
      estado ENUM('esperando','atendiendo','atendido') DEFAULT 'esperando',
      ventanilla_id INT DEFAULT NULL,
      tiempo_espera INT DEFAULT NULL
    )
  `;

  const ventanillas = `
    CREATE TABLE IF NOT EXISTS ventanillas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      numero INT NOT NULL,
      ocupada BOOLEAN DEFAULT FALSE,
      ticket_actual VARCHAR(10) DEFAULT NULL,
      total_atendidos INT DEFAULT 0
    )
  `;

  const historial = `
    CREATE TABLE IF NOT EXISTS historial (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ticket VARCHAR(10) NOT NULL,
      nombre VARCHAR(100) NOT NULL,
      ventanilla_id INT NOT NULL,
      hora_llegada DATETIME NOT NULL,
      hora_atencion DATETIME DEFAULT CURRENT_TIMESTAMP,
      tiempo_espera INT NOT NULL
    )
  `;

  db.query(clientes, (err) => {
    if (err) console.log('❌ Error tabla clientes:', err.message);
    else console.log('✅ Tabla clientes lista');
  });

  db.query(ventanillas, (err) => {
    if (err) console.log('❌ Error tabla ventanillas:', err.message);
    else {
      console.log('✅ Tabla ventanillas lista');
      // Insertar las 4 ventanillas si no existen
      db.query('SELECT COUNT(*) as total FROM ventanillas', (err, result) => {
        if (!err && result[0].total === 0) {
          db.query(`
            INSERT INTO ventanillas (numero, ocupada) VALUES 
            (1, false),(2, false),(3, false),(4, false)
          `, (err) => {
            if (!err) console.log('✅ 4 ventanillas insertadas correctamente');
          });
        } else {
          console.log('✅ Ventanillas ya existen');
        }
      });
    }
  });

  db.query(historial, (err) => {
    if (err) console.log('❌ Error tabla historial:', err.message);
    else console.log('✅ Tabla historial lista');
  });
}

module.exports = db;