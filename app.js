import express from 'express';
import dotenv from 'dotenv';
import bookRoutes from './src/routes/bookRoutes.js';
import sequelize from './src/config/database.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', bookRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar con la base de datos:', err);
  });
