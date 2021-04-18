import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres://zbypwrlcvtbjls:9abcd848b2148c76b3e7b1ce3fce8a7f72bd2027e5f89e6b0931c21dc0d58a39@ec2-54-155-35-88.eu-west-1.compute.amazonaws.com:5432/d7amsc9d2vaild',
    {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });

// export const sequelize = new Sequelize(
//     process.env.DB,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         dialect: 'postgres',
//         protocol: 'postgres',
//         dialectOptions: {
//             ssl: {
//                 require: true,
//                 rejectUnauthorized: false
//             }
//         }
//     });

// export async function SyncDB(): Promise<void> {
//     await sequelize.sync();
// }
