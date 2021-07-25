import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import isObject from 'lodash.isobject';

import { OK, UNAUTHORIZED } from '../models/constants';
import { tokenServiceInstance, usersServiceInstance } from '../models/instances';
import { RouterBase } from '../types/abstract';
import { Auth, TokenAuth } from '../types/auth';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../lib/tokens';
import { logMethod } from '../logs/logmethod';
import { PayloadRefreshToken, TOKEN_TYPES } from '../types/token';
import { createBodyValid, createBodySchemaTokenValidator } from '../validation/auth';

class AuthRouter extends RouterBase {
    constructor() {
        super();
        this.router.post('/login', createBodyValid, this.login);
        this.router.post('/refresh-token', createBodySchemaTokenValidator, this.refreshToken);
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const userAuth: Auth = req.body as Auth;

        try {
            const userServiceResult = await usersServiceInstance.findByLogin(userAuth.login);

            if (!userServiceResult) {
                res.status(UNAUTHORIZED).end('User not found');
                return;
            }
            const user = userServiceResult.entity.get();
            // TODO: move to controller or service ?
            const match = await bcrypt.compare(userAuth.password, user.password);

            if (!match) {
                res.status(UNAUTHORIZED).end('Invalid credentials');
                return;
            }

            const accessToken = await generateAccessToken(user.id);
            const refreshToken = generateRefreshToken();

            await tokenServiceInstance.createOrUpdateByUserId(refreshToken.id, user.id);

            res.status(OK).json({ accessToken, refreshToken: refreshToken.token });
        } catch(error) {
            logMethod('AuthRouter login: ', '', error);
            return next(error);
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        const { refreshToken }: TokenAuth = req.body;

        try {
            const payload = verifyToken(refreshToken, TOKEN_TYPES.REFRESH);

            if (!isObject(payload)) {
                res.status(400).json({ message: 'Invalid Token!' });
                return;
            }

            const payloadToken = (payload as PayloadRefreshToken);
            const tokenRecord = await tokenServiceInstance.findByTokenId(payloadToken.id);

            if (!tokenRecord) {
                res.status(400).json({ message: 'Invalid Token!' });
                return;
            }

            const newRefreshToken = generateRefreshToken();
            await tokenServiceInstance.updateByTokenId({ tokenId: newRefreshToken.id });

            res.status(200).json({ refreshToken: newRefreshToken.token });
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                res.status(400).json({ message: 'Token expired!' });
                return;
            } else if (error instanceof JsonWebTokenError) {
                res.status(400).json({ message: 'Invalid Token!' });
                return;
            }

            return next(error);
        }
    }
}

const authRouter = new AuthRouter();

export { authRouter };