const config = require('../config/config');
const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

// Rutas
//const userRoutes = require('./routes/userRoutes');
//const productRoutes = require('./routes/productRoutes');

//app.use('/api/users', userRoutes);
//app.use('/api/products', productRoutes);

const port = config.port || 3000;

app.listen(port, () => {
  console.log(`Servidor escuchando ${port}`);
});