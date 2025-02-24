import { Sequelize, DataTypes } from 'sequelize';
import dbconfig from '../config/database.js';

// Importación de los modelos
import UserModel from './user.js';

const env = process.env.NODE_ENV || 'development';
const config = dbconfig[env];


if (!config) {
  throw new Error(`No se encontró configuración para el entorno: ${env}`);
}

// Crear instancia de Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, config);




// Función para inicializar la conexión
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión establecida exitosamente');
  } catch (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
  }
};

// Definir modelos
const user = UserModel(sequelize, DataTypes);

// Configurar sincronización de modelos
const syncDB = async () => {
  const encender = false; // Cambia a true si quieres sincronizar
  if (encender) {
    try {
      await sequelize.sync({ force: true }); // Usa alter: true si no quieres borrar datos
      console.log('✅ Modelos sincronizados con la base de datos');
    } catch (err) {
      console.error('❌ Error al sincronizar los modelos:', err);
    }
  } else {
    console.log('🚀 Sincronización de modelos desactivada');
  }
};

// Ejecutar conexión y sincronización
(async () => {
  await connectDB();
  await syncDB();
})();

// Exportar base de datos
const db = {
  Sequelize,
  sequelize,
  user
};

export default db;
