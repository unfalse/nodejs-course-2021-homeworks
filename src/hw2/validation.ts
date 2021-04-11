import * as Joi from 'joi';
import {
  ContainerTypes,
  ValidatedRequest,
  ValidatedRequestSchema,
  createValidator
} from 'express-joi-validation'

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
  id: Joi.string().pattern(/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i).required(), // TODO: write a regex pattern for uuid
  age: Joi.number().min(4).max(130),
  login: Joi.string().required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{8,100}$/).required()
});

export {
  createUserSchema,
  updateUserSchema,
  CreateUserSchema,
  UpdateUserSchema,
  validator,
  ValidatedRequest
};