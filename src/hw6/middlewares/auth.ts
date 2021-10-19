import isString from 'lodash.isstring';
import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { BAD_REQUEST, FORBIDDEN } from '../models/constants';
import { verifyToken } from '../lib/tokens';
import { TOKEN_TYPES } from '../types/token';

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers['x-access-token'];
    if(req.path === '/auth/login') {
        return next();
    }
    try {
        if (!accessToken) {
            res.status(FORBIDDEN).send({ message: 'No token provided!' });
            return;
        }

        if (!isString(accessToken)) {
            throw JsonWebTokenError;
        }

        verifyToken(accessToken, TOKEN_TYPES.ACCESS);

        return next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            res.status(BAD_REQUEST).json({ message: 'Token expired!' });
            return;
        } else if (error instanceof JsonWebTokenError) {
            res.status(BAD_REQUEST).json({ message: 'Invalid Token!' });
            return;
        }

        return next(error);
    }
};