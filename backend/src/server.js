require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', apiRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('API de Tienda Virtual Funcionando');
});

// Database Sync and Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Note: use { force: true } only during development to reset DB if data changes
    await sequelize.sync({ alter: true }); 
    console.log('Base de datos sincronizada');
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};

startServer();
