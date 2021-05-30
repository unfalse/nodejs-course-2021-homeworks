import { DataTypes, ModelDefined } from 'sequelize';

import { sequelize } from '../data-access';
import { UserGroup } from '../types/usergroup';
import { UserGroupInterface } from '../types/model';

export const userGroupModel: ModelDefined<UserGroup, UserGroup> = sequelize.define<UserGroupInterface>('UserGroup', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    groupid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    userid: {
        type: DataTypes.UUID,
        allowNull: false
    },
},
{
    tableName: 'usergroup',
    timestamps: false
});
