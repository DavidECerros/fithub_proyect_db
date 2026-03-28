const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT id_actividad, nombre, descripcion, cupo_maximo, horario, id_centro
       FROM actividad
       ORDER BY id_actividad`
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
      `SELECT id_actividad, nombre, descripcion, cupo_maximo, horario, id_centro
       FROM actividad
       WHERE id_actividad = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { nombre, descripcion, cupo_maximo, horario, id_centro } = req.body;

    if (!nombre || !cupo_maximo || !id_centro) {
      return res.status(400).json({
        error: 'nombre, cupo_maximo e id_centro son obligatorios'
      });
    }

    if (cupo_maximo <= 0) {
      return res.status(400).json({
        error: 'El cupo_maximo debe ser mayor a 0'
      });
    }

    const result = await pool.query(
      `INSERT INTO actividad (nombre, descripcion, cupo_maximo, horario, id_centro)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [nombre, descripcion, cupo_maximo, horario, id_centro]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {

    if (err.code === '23503') {
      return res.status(400).json({
        error: 'El centro deportivo no existe'
      });
    }

    return res.status(500).json({
      error: 'Error al crear la actividad'
    });
  }
});

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
