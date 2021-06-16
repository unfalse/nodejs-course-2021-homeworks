import { Sequelize } from 'sequelize';
import { getDatabaseCredentials } from '../lib/variables';

export const sequelize = new Sequelize(
    {
        ...getDatabaseCredentials(),
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    },
);
