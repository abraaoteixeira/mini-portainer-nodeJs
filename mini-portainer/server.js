require('dotenv').config();
const express = require('express');
const Docker = require('dockerode');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');


const path = require('path');
const app = express();
const docker = new Docker();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.json());
app.use(cors());
// Garante que o caminho da pasta public é absoluto, independente de onde rodar o comando
app.use(express.static(path.join(__dirname, 'public')));

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).send('🔒 Acesso negado');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('🚫 Token inválido');
    req.user = user;
    next();
  });
}

// Registro
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const password_hash = bcrypt.hashSync(password, 10);
  await pool.query(
    'INSERT INTO users (username, password_hash) VALUES ($1, $2)',
    [username, password_hash]
  );
  res.send('🎉 Registrado com sucesso');
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  const user = result.rows[0];
  if (user && bcrypt.compareSync(password, user.password_hash)) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('❌ Credenciais inválidas');
  }
});

// Listar containers
app.get('/containers', authenticateToken, async (req, res) => {
  const containers = await docker.listContainers({ all: true });
  res.json(containers);
});

// Iniciar container
app.post('/containers/:id/start', authenticateToken, async (req, res) => {
  const container = docker.getContainer(req.params.id);
  await container.start();
  await pool.query(
    'INSERT INTO actions (user_id, action_type, target) VALUES ($1, $2, $3)',
    [req.user.id, 'start', req.params.id]
  );
  res.send('▶️ Container iniciado');
});

// Parar container
app.post('/containers/:id/stop', authenticateToken, async (req, res) => {
  const container = docker.getContainer(req.params.id);
  await container.stop();
  await pool.query(
    'INSERT INTO actions (user_id, action_type, target) VALUES ($1, $2, $3)',
    [req.user.id, 'stop', req.params.id]
  );
  res.send('⏸️ Container parado');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor rodando na porta', PORT);
});