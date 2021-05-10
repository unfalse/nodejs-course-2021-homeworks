import { Request, Response, Router } from 'express';

import { usersServiceInstance } from '../models/instances';
import { User } from '../types';
import { UserError, UserMethodResult, UsersSuggestResult, UsersUpdateResult } from '../types/common';
import { CreateUserSchema, createUserSchema, updateUserSchema, UpdateUserSchema, ValidatedRequest, validator } from '../validation';

const OK = 200;
const SERVER_ERROR = 500;

const usersRouter = Router();

const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (id) {
        const { user, errorMessage }: UserMethodResult = await usersServiceInstance.getUser(id);
        if (!user && errorMessage) {
            res.status(SERVER_ERROR).send(`Error has happened! ${errorMessage}`);
            return;
        }
        res.json(user);
    }
};

const createUser = async (req: ValidatedRequest<CreateUserSchema>, res: Response) => {
    const { login, password, age } = req.body;
    const user: User = { login, password, age, id: '', isdeleted: false };
    const { errorMessage }: UserError = await usersServiceInstance.createUser(user);
    if (errorMessage) {
        res.status(SERVER_ERROR).send(`Error has happened! ${errorMessage}`);
        return;
    }
    res.sendStatus(OK);
};

const updateUser = async (req: ValidatedRequest<UpdateUserSchema>, res: Response) => {
    const { login, password, age } = req.body;
    const user: User = { login, password, age, id: '', isdeleted: false };
    const updateResult: UsersUpdateResult = await usersServiceInstance.updateUser(user);
    if (updateResult.errorMessage) {
        res.status(SERVER_ERROR).send(`Error has happened! ${updateResult.errorMessage}`);
        return;
    }
    res.status(OK).send(`Rows updated: ${updateResult.updatedUsers}`);
};

const suggestUsers = async (req: Request, res: Response) => {
    const { login, limit } = req.params;
    const { users, errorMessage }: UsersSuggestResult = await usersServiceInstance.suggestUsers(login, +limit);
    if (errorMessage) {
        res.status(SERVER_ERROR).send(`Error has happened! ${errorMessage}`);
        return;
    }
    res.send(users);
};

const removeUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { errorMessage }: UserError = await usersServiceInstance.removeUser(id);
    if (errorMessage) {
        res.status(SERVER_ERROR).send(`Error has happened! ${errorMessage}`);
        return;
    }
    res.sendStatus(OK);
};

const getRoot = async (req: Request, res: Response) => { };

usersRouter.get('/', getRoot);
usersRouter.get('/get/:id', getUser);
usersRouter.post('/new', validator.body(createUserSchema), createUser);
usersRouter.put('/update', validator.body(updateUserSchema), updateUser);
usersRouter.get('/suggest/:login/:limit', suggestUsers);
usersRouter.delete('/remove/:id', removeUser);

export { usersRouter };
