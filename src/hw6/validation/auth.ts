import Joi from 'joi';
import validation from 'express-joi-validation';

import { Auth, TokenAuth } from '../types/auth';

const validator = validation.createValidator({});

const createBodySchema = Joi.object<Auth>({
    login: Joi.string().required(),
    password: Joi.string().required(),
});

const createBodySchemaToken = Joi.object<TokenAuth>({
    accessToken: Joi.string(),
    refreshToken: Joi.string(),
});

export const createBodyValid = validator.body(createBodySchema, { joi: { stripUnknown: { objects: true } } });
export const createBodySchemaTokenValidator = validator.body(createBodySchemaToken, { joi: { stripUnknown: { objects: true } } });
