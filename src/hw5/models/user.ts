import { DataTypes, ModelDefined } from 'sequelize';

import { sequelize } from '../data-access';
import { User as UserType } from '../types';
import { UserInterface } from '../types/model';

export const userModel: ModelDefined<UserType, UserType> = sequelize.define<UserInterface>('User', {
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
