import { Sequelize } from "sequelize";
import { PG_HOST, PG_USER, PG_PASSWORD, PG_DATABASE } from './data_config.js';

export const sequelize = new Sequelize(PG_DATABASE, PG_USER, PG_PASSWORD, {
    host: PG_HOST,
    dialect: 'postgres',
});

export const databaseConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL connected successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};