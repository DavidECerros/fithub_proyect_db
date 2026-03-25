const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /api/personas
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
