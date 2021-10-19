import * as Joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequestSchema,
    ValidatedRequest,
    createValidator
} from 'express-joi-validation';

import { Permission } from '../types/group';

export interface CreateUserSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
        age: number;
        login: string;
        password: string;
    }
}

export interface CreateGroupSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        name: string;
        permissions: Array<Permission>;
    }
}

export interface UpdateUserSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
        age: number;
        login: string;
        password: string;
    }
}

export interface UpdateGroupSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        name: string;
        permissions: Array<Permission>;
    }
}

export const validator = createValidator();

export const createUserSchema = Joi.object({
    age: Joi.number().min(4).max(130),
    login: Joi.string().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,100}$/).required()
});

export const updateUserSchema = Joi.object({
    age: Joi.number().min(4).max(130),
    login: Joi.string().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,100}$/)
});

export const createGroupSchema = Joi.object({
    name: Joi.string().required(),
    // TODO: make good validation with regexps like "READ,WRITE"
    permissions: Joi.string().required()
});

export const updateGroupSchema = Joi.object({
    name: Joi.string().required(),
    // TODO: make good validation with regexps like "READ,WRITE"
    permissions: Joi.string().required()
});

export { ValidatedRequest };