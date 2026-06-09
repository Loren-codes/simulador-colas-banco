const express = require('express');
const mysql = require('mysql2');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = require('./database');

// ─────────────────────────────────────
// RUTAS / ENDPOINTS
// ─────────────────────────────────────

// 1. Agregar cliente a la cola
app.post('/cliente/agregar', (req, res) => {
  const { nombre } = req.body;

  // Generar ticket automático
  db.query('SELECT COUNT(*) as total FROM clientes', (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    const numero = result[0].total + 1;
    const ticket = 'B' + String(numero).padStart(3, '0');

    db.query(
      'INSERT INTO clientes (ticket, nombre) VALUES (?, ?)',
      [ticket, nombre],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });

        console.log(`✅ Cliente agregado: ${ticket} - ${nombre}`);
        
        // Notificar a todos en tiempo real
        io.emit('cliente_agregado', { ticket, nombre });
        
        res.json({ mensaje: 'Cliente agregado', ticket, nombre });
      }
    );
  });
});

// 2. Ver cola de espera
app.get('/cola', (req, res) => {
  db.query(
    "SELECT * FROM clientes WHERE estado = 'esperando' ORDER BY hora_llegada ASC",
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    }
  );
});

// 3. Ver ventanillas
app.get('/ventanillas', (req, res) => {
  db.query('SELECT * FROM ventanillas ORDER BY numero ASC', (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// 4. Atender cliente — marcar ticket como atendido
app.put('/cliente/atender/:ticket', (req, res) => {
  const { ticket } = req.params;

  db.query(
    "UPDATE clientes SET estado = 'atendido' WHERE ticket = ?",
    [ticket],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });

      console.log(`✅ Ticket ${ticket} atendido`);

      // Notificar a todos en tiempo real
      io.emit('cliente_atendido', { ticket });

      res.json({ mensaje: `Ticket ${ticket} atendido correctamente` });
    }
  );
});

// 5. Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: '🏦 Servidor Simulador Bancario funcionando' });
});

// Iniciar servidor
server.listen(3000, () => {
  console.log('🚀 Servidor corriendo en http://localhost:3000');
});