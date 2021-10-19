import { DataTypes, ModelDefined } from 'sequelize';

import { sequelize } from '../data-access';
import { Group } from '../types/group';
import { GroupInterface } from '../types/model';

export const groupModel: ModelDefined<Group, Group> = sequelize.define<GroupInterface>('Group', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    tableName: 'groups',
    timestamps: false
});
