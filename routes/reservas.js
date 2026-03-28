const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        r.id_reserva,
        r.fecha,
        r.estado,
        r.id_cliente,
        CONCAT(p.nombre1, ' ', p.apellido1, ' ', COALESCE(p.apellido2, '')) AS cliente,
        a.nombre AS actividad
      FROM public.reserva r
      INNER JOIN public.cliente c
        ON r.id_cliente = c.id_persona
      INNER JOIN public.persona p
        ON c.id_persona = p.id_persona
      INNER JOIN public.actividad a
        ON r.id_actividad = a.id_actividad
      ORDER BY r.id_reserva
    `);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reservas', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(`
      SELECT
        r.id_reserva,
        r.fecha,
        r.estado,
        r.id_cliente,
        r.id_actividad,
        CONCAT(p.nombre1, ' ', p.apellido1, ' ', COALESCE(p.apellido2, '')) AS cliente,
        a.nombre AS actividad
      FROM public.reserva r
      INNER JOIN public.cliente c
        ON r.id_cliente = c.id_persona
      INNER JOIN public.persona p
        ON c.id_persona = p.id_persona
      INNER JOIN public.actividad a
        ON r.id_actividad = a.id_actividad
      WHERE r.id_reserva = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reserva', error: error.message });
  }
});

<<<<<<< HEAD
router.post('/', async (req, res, next) => {
  try {
    const { id_persona, id_actividad, fecha } = req.body;

    
    if (!id_persona || !id_actividad || !fecha) {
      return res.status(400).json({
        error: 'id_persona, id_actividad y fecha son obligatorios'
      });
    }

  
    if (new Date(fecha) < new Date()) {
      return res.status(400).json({
        error: 'La fecha no puede ser en el pasado'
      });
    }

    const result = await pool.query(
      `INSERT INTO reserva (id_persona, id_actividad, fecha)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [id_persona, id_actividad, fecha]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {

    if (err.code === '23503') {
      return res.status(400).json({
        error: 'La persona o la actividad no existen'
      });
    }

    return res.status(500).json({
      error: 'Error al crear la reserva'
    });
  }
});
=======
// PUT /api/reservas/:id — actualizar reserva completa
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { id_cliente, id_actividad, fecha, estado } = req.body;

  if (!id_cliente || !id_actividad || !fecha || !estado) {
    return res.status(400).json({ error: 'id_cliente, id_actividad, fecha y estado son requeridos' });
  }

  try {
    const result = await db.query(
      `UPDATE reserva
       SET id_cliente=$1, id_actividad=$2, fecha=$3, estado=$4
       WHERE id_reserva=$5 RETURNING *`,
      [id_cliente, id_actividad, fecha, estado, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar reserva', error: error.message });
  }
});

// PATCH /api/reservas/:id — actualizar campos parciales (ej. solo el estado)
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const campos = req.body;
  const keys = Object.keys(campos);

  if (keys.length === 0) return res.status(400).json({ error: 'No se enviaron campos para actualizar' });

  const setClause = keys.map((k, i) => `${k}=$${i + 1}`).join(', ');
  const values = [...Object.values(campos), id];

  try {
    const result = await db.query(
      `UPDATE reserva SET ${setClause} WHERE id_reserva=$${keys.length + 1} RETURNING *`,
      values
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar reserva', error: error.message });
  }
});

>>>>>>> 3563e85 (agregar imagenes y actualizaciones)
module.exports = router;