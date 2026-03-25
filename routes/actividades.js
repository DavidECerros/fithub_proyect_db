const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /api/actividades
router.post('/', async (req, res, next) => {
  try {
    const { nombre, descripcion, cupo_maximo, horario, id_centro } = req.body;
    const result = await pool.query(
      `INSERT INTO actividad (nombre, descripcion, cupo_maximo, horario, id_centro)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, descripcion, cupo_maximo, horario, id_centro]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
