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

    
    if (!id_reserva || !monto) {
      return res.status(400).json({
        error: 'id_reserva y monto son obligatorios'
      });
    }

    if (monto <= 0) {
      return res.status(400).json({
        error: 'El monto debe ser mayor a 0'
      });
    }

    const result = await pool.query(
      `INSERT INTO pago (id_reserva, monto, metodo_pago, fecha_pago)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id_reserva, monto, metodo_pago, fecha_pago || new Date()]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {

    
    if (err.code === '23503') {
      return res.status(400).json({
        error: 'La reserva no existe'
      });
    }

    return res.status(500).json({
      error: 'Error al registrar el pago'
    });
  }
});

// PUT /api/pagos/:id_reserva/:num_pago — actualizar pago completo
// La tabla pago tiene PK compuesta (id_reserva, num_pago)
router.put('/:id_reserva/:num_pago', async (req, res, next) => {
  const { id_reserva, num_pago } = req.params;
  const { monto, metodo_pago, fecha_pago } = req.body;

  if (!monto || !metodo_pago || !fecha_pago) {
    return res.status(400).json({ error: 'monto, metodo_pago y fecha_pago son requeridos' });
  }

  try {
    const result = await pool.query(
      `UPDATE pago
       SET monto=$1, metodo_pago=$2, fecha_pago=$3
       WHERE id_reserva=$4 AND num_pago=$5 RETURNING *`,
      [monto, metodo_pago, fecha_pago, id_reserva, num_pago]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Pago no encontrado' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/pagos/:id_reserva/:num_pago — actualizar campos parciales
router.patch('/:id_reserva/:num_pago', async (req, res, next) => {
  const { id_reserva, num_pago } = req.params;
  const campos = req.body;
  const keys = Object.keys(campos);

  if (keys.length === 0) return res.status(400).json({ error: 'No se enviaron campos para actualizar' });

  const setClause = keys.map((k, i) => `${k}=$${i + 1}`).join(', ');
  const values = [...Object.values(campos), id_reserva, num_pago];

  try {
    const result = await pool.query(
      `UPDATE pago SET ${setClause} WHERE id_reserva=$${keys.length + 1} AND num_pago=$${keys.length + 2} RETURNING *`,
      values
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Pago no encontrado' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
