import dotenv from 'dotenv';

// Obtener el entorno actual
const env = process.env.NODE_ENV || 'production';

// Cargar el archivo `.env` correspondiente al entorno
dotenv.config({ path: env === 'production' ? '.env.production' : '.env.development' });

console.log(`Estamos en entorno: ${env}`);

const config = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT || 33060,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 60000,
    },
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT || 33060,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 60000,
    },
  },
};

export default config;
