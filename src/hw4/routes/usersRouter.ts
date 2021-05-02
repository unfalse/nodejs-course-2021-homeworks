import { Request, Response, Router } from 'express';
import { OK, SERVER_ERROR } from '../models/constants';

import { usersServiceInstance } from '../models/instances';
import { User } from '../types';
import { CRUDRouter } from '../types/abstract';
import { UserError, UserMethodResult, UsersSuggestResult, UsersUpdateResult } from '../types/common';
import { CreateUserSchema, createUserSchema, updateUserSchema, UpdateUserSchema, ValidatedRequest, validator } from '../validation';

class UsersRouter extends CRUDRouter {

    router: any;

    constructor() {
        super();
        this.router.get('/', this.getRoot);
        this.router.get('/get/:id', this.get);
        this.router.post('/new', validator.body(createUserSchema), this.create);
        this.router.put('/update', validator.body(updateUserSchema), this.update);
        this.router.get('/suggest/:login/:limit', this.suggestUsers);
        this.router.delete('/remove/:id', this.remove);
    }

    async get(req: Request, res: Response) {
        const { id } = req.params;
        if (id) {
            const { user, errorMessage }: UserMethodResult = await usersServiceInstance.getUser(id);
            if (!user && errorMessage) {
                res.status(SERVER_ERROR).send(`Error has happened! ${errorMessage}`);
                return;
            }
            res.json(user);
        }
    }

    async create(req: ValidatedRequest<CreateUserSchema>, res: Response) {
        const { login, password, age } = req.body;
        const user: User = { login, password, age, id: '', isdeleted: false };
        const { errorMessage }: UserError = await usersServiceInstance.createUser(user);
        if (errorMessage) {
            res.status(SERVER_ERROR).send(`Error has happened! ${errorMessage}`);
            return;
        }
        res.sendStatus(OK);
    }
    
    async update(req: ValidatedRequest<UpdateUserSchema>, res: Response) {
        const { login, password, age } = req.body;
        const user: User = { login, password, age, id: '', isdeleted: false };
        const updateResult: UsersUpdateResult = await usersServiceInstance.updateUser(user);
        if (updateResult.errorMessage) {
            res.status(SERVER_ERROR).send(`Error has happened! ${updateResult.errorMessage}`);
            return;
        }
        res.status(OK).send(`Rows updated: ${updateResult.updatedUsers}`);
    }
    
    async suggestUsers(req: Request, res: Response) {
        const { login, limit } = req.params;
        const { users, errorMessage }: UsersSuggestResult = await usersServiceInstance.suggestUsers(login, +limit);
        if (errorMessage) {
            res.status(SERVER_ERROR).send(`Error has happened! ${errorMessage}`);
            return;
        }
        res.send(users);
    }
    
    async remove(req: Request, res: Response) {
        const { id } = req.params;
        const { errorMessage }: UserError = await usersServiceInstance.removeUser(id);
        if (errorMessage) {
            res.status(SERVER_ERROR).send(`Error has happened! ${errorMessage}`);
            return;
        }
        res.sendStatus(OK);
    }

    async getRoot(req: Request, res: Response) { }
}

const usersRouter = new UsersRouter();

export { usersRouter };
