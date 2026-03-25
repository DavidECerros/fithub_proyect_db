const express = require('express');
const errorHandler = require('./errorHandler');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/personas',    require('./routes/personas'));
app.use('/api/actividades', require('./routes/actividades'));
app.use('/api/reservas',    require('./routes/reservas'));
app.use('/api/pagos',       require('./routes/pagos'));

app.get('/', (req, res) => {
  res.json({ status: 'ok', proyecto: 'FitHub API' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`FitHub API corriendo en http://localhost:${PORT}`);
});
