import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const requiredEnv = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_DIALECT'];
requiredEnv.forEach((key) => {
  if (process.env[key] === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
  }
);

export default sequelize;
