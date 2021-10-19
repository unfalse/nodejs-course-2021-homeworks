import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';

import { TOKEN_TYPES, TOKEN_KEY_SECRETS, PayloadRefreshToken, PayloadAccessToken } from '../types/token';

export const generateAccessToken = async (userId: string): Promise<string> => {
    const payload: PayloadAccessToken = {
        userId,
        type: TOKEN_TYPES.ACCESS,
    };

    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_LIFE,
    });
};

export const generateRefreshToken = (): { id: string; token: string; } => {
    const payload: PayloadRefreshToken = {
        id: v4(),
        type: TOKEN_TYPES.REFRESH,
    };

    const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_LIFE,
    });

    return {
        token,
        id: payload.id,
    };
};

export const verifyToken = (token: string, type: TOKEN_TYPES) => {
    return jwt.verify(token, process.env[TOKEN_KEY_SECRETS[type]]);
};
