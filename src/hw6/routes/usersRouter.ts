import { Request, Response } from 'express';

import { OK } from '../models/constants';
import { usersServiceInstance } from '../models/instances';
import { User } from '../types/user';
import { CRUDRouter } from '../types/abstract';
import {
    CreateUserSchema,
    createUserSchema,
    updateUserSchema,
    UpdateUserSchema,
    ValidatedRequest,
    validator 
} from '../validation';

class UsersRouter extends CRUDRouter {

    constructor() {
        super();
        // TODO: add validation for get?
        this.router.get('/get/:id', this.get);
        this.router.post('/new', validator.body(createUserSchema), this.create);
        this.router.put('/update', validator.body(updateUserSchema), this.update);
        this.router.get('/suggest/:login/:limit', this.suggestUsers);
        this.router.delete('/remove/:id', this.remove);
        this.router.get('/login', this.login);
    }

    async get(req: Request, res: Response) {
        const { id } = req.params;
        if (id) {
            const { entity } = await usersServiceInstance.get(id);
            res.json(entity);
        }
    }

    async create(req: ValidatedRequest<CreateUserSchema>, res: Response) {
        const { login, password, age } = req.body;
        const user: User = { login, password, age, id: '', isdeleted: false };
        await usersServiceInstance.create(user);
        res.sendStatus(OK);
    }
    
    async update(req: ValidatedRequest<UpdateUserSchema>, res: Response) {
        const { login, password, age } = req.body;
        const user: User = { login, password, age, id: '', isdeleted: false };
        const updateResult = await usersServiceInstance.update(user);
        res.status(OK).send(`Rows updated: ${updateResult.updatedEntities}`);
    }
    
    async suggestUsers(req: Request, res: Response) {
        const { login, limit } = req.params;
        const { entities } = await usersServiceInstance.suggestUsers(login, Number(limit));
        res.send(entities);
    }
    
    async remove(req: Request, res: Response) {
        const { id } = req.params;
        await usersServiceInstance.remove(id);
        res.sendStatus(OK);
    }

    async login(req: Request, res: Response) {
        const { login, password } = req.body;
        // const { user } = 
        await usersServiceInstance.login(login, password);
    }
}

const usersRouter = new UsersRouter();

export { usersRouter };
