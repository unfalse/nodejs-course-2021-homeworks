import { Request, Response } from 'express';

import { OK, SERVER_ERROR } from '../models/constants';
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
import { checkToken } from '../middlewares/auth';

class UsersRouter extends CRUDRouter {

    constructor() {
        super();
        this.router.get('/get/:id', this.get);
        this.router.post('/new', validator.body(createUserSchema), this.create);
        this.router.put('/update', validator.body(updateUserSchema), this.update);
        this.router.get('/suggest/:login/:limit', checkToken, this.suggestUsers);
        this.router.delete('/remove/:id', this.remove);
    }

    async get(req: Request, res: Response) {
        const { id } = req.params;

        if (id) {
            const result = await usersServiceInstance.get(id);

            if (!result) {
                res.status(SERVER_ERROR).send('Internal server error');
                return;
            }
            res.json(result.entity);
        }
    }

    async create(req: ValidatedRequest<CreateUserSchema>, res: Response) {
        const { login, password, age } = req.body;
        const user: User = { login, password, age, id: '', isdeleted: false };
        const error = await usersServiceInstance.create(user);
        if (!error) {
            res.sendStatus(OK);
        } else {
            res.status(SERVER_ERROR).send('Internal server error');
        }
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
}

const usersRouter = new UsersRouter();

export { usersRouter };
