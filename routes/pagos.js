const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /api/pagos
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
