const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT id_reserva, id_cliente, id_actividad, fecha, estado
       FROM reserva
       ORDER BY id_reserva`
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
      `SELECT id_reserva, id_cliente, id_actividad, fecha, estado
       FROM reserva
       WHERE id_reserva = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

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
