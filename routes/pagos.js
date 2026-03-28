const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT id_reserva, num_pago, monto, metodo_pago, fecha_pago
       FROM pago
       ORDER BY id_reserva, num_pago`
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
      `SELECT id_reserva, num_pago, monto, metodo_pago, fecha_pago
       FROM pago
       WHERE id_reserva = $1
       ORDER BY num_pago`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { id_reserva, monto, metodo_pago, fecha_pago } = req.body;
    const result = await pool.query(
      `INSERT INTO pago (id_reserva, monto, metodo_pago, fecha_pago)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [id_reserva, monto, metodo_pago, fecha_pago || new Date()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
