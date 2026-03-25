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

module.exports = router;
