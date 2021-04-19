import { Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const sequelize = new Sequelize('postgres://zbypwrlcvtbjls:9abcd848b2148c76b3e7b1ce3fce8a7f72bd2027e5f89e6b0931c21dc0d58a39@ec2-54-155-35-88.eu-west-1.compute.amazonaws.com:5432/d7amsc9d2vaild',
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

// (async function connect() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.log('Unable to connect to the database:', error);
//     }
// }());

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
{
    tableName: 'users',
    timestamps: false
});

(async function Sync() {
    await sequelize.sync();
    console.log('synced!');

    const users = await User.findAll();
    console.log(users.every(user => user instanceof User));
    console.log(JSON.stringify(users, null, 2));

    const user = {
        id: '3dfea2c5-47ae-4209-9a0b-222f1a717758',
        login: 'Kane',
        age: 24,
        password: 'kane1234',
        isdeleted: false
    };
    try {
        const result = await User.update(user, { where: { id: user.id }, returning: false });
        console.log(result);
    } catch (e) {
        console.log('Update has failed!');
    }
    // const jane = User.build({
    //     login: 'Jane',
    //     password: 'jane1234',
    //     age: 24,
    //     isdeleted: false,
    //     id: uuidv4()
    // });
    // try {
    //     await jane.save();
    // } catch (e) {
    //     console.error('Cannot save!');
    //     console.log(e);
    // }
}());

console.log('end!');
