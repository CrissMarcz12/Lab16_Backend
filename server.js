const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

// Importar modelos para sincronización
require('./models/User');
require('./models/Service');
require('./models/Appointment');

// Configurar variables de entorno
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);

// Probar conexión a BD y sincronizar modelos
db.authenticate()
  .then(() => {
    console.log('✅ Conexión a la base de datos exitosa.');
    return db.sync(); // Sincroniza modelos con BD
  })
  .then(() => {
    console.log('✅ Modelos sincronizados.');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => console.error('❌ Error al conectar con la base de datos:', err));

