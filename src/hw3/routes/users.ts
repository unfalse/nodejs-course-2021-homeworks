import { Request, Response, Router } from 'express';

import { usersServiceInstance } from '../models/instances';
import { CreateUserParams } from '../types/services';
import { CreateUserSchema, createUserSchema, updateUserSchema, UpdateUserSchema, ValidatedRequest, validator } from '../validation';

const NOT_FOUND = 404;
const OK = 200;

const usersRouter = Router();

const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (id) {
        const user = await usersServiceInstance.getUser(id);
        if (!user) {
            res.status(NOT_FOUND).send(`User with id = ${id} has not found`);
            return;
        }
        res.json(user);
    }
};

const createUser = async (req: ValidatedRequest<CreateUserSchema>, res: Response) => {
    const userData: CreateUserParams = req.body;
    usersServiceInstance.createUser(userData);
    res.sendStatus(OK);
};

const updateUser = async (req: ValidatedRequest<UpdateUserSchema>, res: Response) => { };

const suggestUsers = async (req: Request, res: Response) => { };

const removeUser = async (req: Request, res: Response) => { };

const getList = async (req: Request, res: Response) => { };

const getRoot = async (req: Request, res: Response) => { };

usersRouter.get('/', getRoot);
usersRouter.get('/get/:id', getUser);
usersRouter.get('/list', getList);
usersRouter.post('/new', validator.body(createUserSchema), createUser);
usersRouter.put('/update', validator.body(updateUserSchema), updateUser);
usersRouter.get('/suggest/:login/:limit', suggestUsers);
usersRouter.delete('/remove/:id', removeUser);

export { usersRouter };
