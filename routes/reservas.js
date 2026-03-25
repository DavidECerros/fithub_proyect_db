const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /api/reservas
router.post('/', async (req, res, next) => {
  try {
    const { id_cliente, id_actividad, fecha } = req.body;
    const result = await pool.query(
      `INSERT INTO reserva (id_cliente, id_actividad, fecha)
       VALUES ($1, $2, $3) RETURNING *`,
      [id_cliente, id_actividad, fecha]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
