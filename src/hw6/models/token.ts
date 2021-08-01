import { DataTypes, ModelDefined } from 'sequelize';

import { sequelize } from '../data-access';
import { TokenModelInterface } from '../types/model';
import { TokenModel } from '../types/token';

export const tokenModel: ModelDefined<TokenModel, TokenModel> = sequelize.define<TokenModelInterface>(
    'Token', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    tokenId: {
        type: DataTypes.UUID,
    },
    userId: {
        type: DataTypes.UUID,
    }
    },
    {
        tableName: 'tokens'
    });
