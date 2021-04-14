import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { UserService } from './service';
import { RemoveUserParams, SuggestParams, UpdateUserParams, User, CreateUserParams } from './types';
import { CreateUserSchema, UpdateUserSchema } from './validation';

const NOT_FOUND = 404;
const OK = 200;

const service = new UserService();

export const getAppRootResponse = (_req: Request, res: Response): void => {
    res.send([
        'CRUD User service 1.0',
        'Paths:',
        '/get/:id                 - GET get user by id',
        '/new                     - POST create a new user',
        '/update                  - POST update a user',
        '/suggest/:login/:limit   - GET get users list by user string',
        '/remove/:id              - DELETE remove a user by id'
    ].join('<br>'));
};

export const getUser = (req: Request, res: Response): void => {
    const { id } = req.params;
    const user = service.getUser(id);
    if (user === null) {
        res.status(NOT_FOUND).send(`User with id = ${id} was not found`);
    } else {
        res.send(user);
    }
};

export const getList = (_req: Request, res: Response): void => {
    res.send(service.getList());
};

export const createUser = (req: ValidatedRequest<CreateUserSchema>, res: Response): void => {
    const userData: CreateUserParams = req.body;
    service.createUser(userData);
    res.sendStatus(OK);
};

export const updateUser = (req: ValidatedRequest<UpdateUserSchema>, res: Response): void => {
    const user: UpdateUserParams = { ...req.body };
    if (service.updateUser(user)) {
        res.sendStatus(OK);
    } else {
        res.status(NOT_FOUND).send(`User with login ${user.login} was not found!`);
    }
};

export const suggestUsers = (req: Request<SuggestParams>, res: Response): void => {
    const { login, limit }: SuggestParams = req.params;
    const users: User[] = service.getAutoSuggestUsers(login, +limit);
    if (users.length) {
        res.send(users);
    } else {
        res.status(NOT_FOUND).send(`No users was found with ${login} in their login!`);
    }
};

export const removeUser = (req: Request<RemoveUserParams>, res: Response): void => {
    const { id }: RemoveUserParams = req.params;
    const removedUserId = service.removeUser(id);
    if (removedUserId !== null) {
        res.send(removedUserId);
    } else {
        res.status(NOT_FOUND).send(`User with login ${id} was not found!`);
    }
};
