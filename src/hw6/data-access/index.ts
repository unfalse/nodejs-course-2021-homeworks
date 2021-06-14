import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    '',
    {
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
