const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('supabase')
    ? { rejectUnauthorized: false }
    : false
});

pool.connect()
  .then(() => console.log('Conectado a Supabase correctamente'))
  .catch(err => console.error('Error de conexión a BD:', err.message));

module.exports = pool;