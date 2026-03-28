const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT id_persona, nombre1, apellido1, apellido2, email, tipo
       FROM persona
       ORDER BY id_persona`
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT id_persona, nombre1, apellido1, apellido2, email, tipo
       FROM persona
       WHERE id_persona = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { nombre1, apellido1, apellido2, email, password, tipo } = req.body;
    const result = await pool.query(
      `INSERT INTO persona (nombre1, apellido1, apellido2, email, password, tipo)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nombre1, apellido1, apellido2, email, password, tipo || 'cliente']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// PUT /api/personas/:id — actualizar persona completa
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { nombre1, apellido1, apellido2, email, password, tipo } = req.body;

  if (!nombre1 || !apellido1 || !email || !password || !tipo) {
    return res.status(400).json({ error: 'nombre1, apellido1, email, password y tipo son requeridos' });
  }

  try {
    const result = await pool.query(
      `UPDATE persona
       SET nombre1=$1, apellido1=$2, apellido2=$3, email=$4, password=$5, tipo=$6
       WHERE id_persona=$7 RETURNING *`,
      [nombre1, apellido1, apellido2 || null, email, password, tipo, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Persona no encontrada' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/personas/:id — actualizar campos parciales (ej. solo el tipo)
router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const campos = req.body;
  const keys = Object.keys(campos);

  if (keys.length === 0) return res.status(400).json({ error: 'No se enviaron campos para actualizar' });

  const setClause = keys.map((k, i) => `${k}=$${i + 1}`).join(', ');
  const values = [...Object.values(campos), id];

  try {
    const result = await pool.query(
      `UPDATE persona SET ${setClause} WHERE id_persona=$${keys.length + 1} RETURNING *`,
      values
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Persona no encontrada' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;