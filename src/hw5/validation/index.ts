import * as Joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequestSchema,
    ValidatedRequest,
    createValidator
} from 'express-joi-validation';

interface CreateUserSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
        age: number;
        login: string;
        password: string;
    }
}

interface UpdateUserSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
        age: number;
        login: string;
        password: string;
    }
}

const validator = createValidator();

const createUserSchema = Joi.object({
    age: Joi.number().min(4).max(130),
    login: Joi.string().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,100}$/).required()
});

const updateUserSchema = Joi.object({
    age: Joi.number().min(4).max(130),
    login: Joi.string().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,100}$/)
});

export {
    createUserSchema,
    updateUserSchema,
    CreateUserSchema,
    UpdateUserSchema,
    validator,
    ValidatedRequest
};
