import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { v4 as uuidv4 } from 'uuid';

import { RemoveUserParams, SuggestParams, UpdateUserParams, User, CreateUserParams } from './types';
import { CreateUserSchema, UpdateUserSchema } from './validation';

const NOT_FOUND = 404;
const OK = 200;
const NO_CONTENT = 204;

let users: Array<User> = [];

const getAutoSuggestUsers = (loginSubstring: string, limit: number): User[] =>
  users.filter((u: User) =>
    u.login.toLowerCase().includes(loginSubstring.toLowerCase())
  ).slice(0, limit);

const getAppRootResponse = (_req: Request, res: Response): void => {
  res.send([
    'CRUD User service 1.0',
    'Paths:',
    '/get/:id                 - GET get user by id',
    '/new                     - POST create a new user',
    '/update                  - POST update a user',
    '/suggest/:login/:limit   - GET get users list by user string',
    '/remove/:id              - DELETE remove a user by id'
  ].join('<br>'));
}

const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (user === undefined) {
    res.status(NOT_FOUND).send('Not found');
  } else {
    res.send(user);
  }
}

const getList = (_req: Request, res: Response) => {
  res.send(users);
}

const createUser = (req: ValidatedRequest<CreateUserSchema>, res: Response) => {
  const { age, login, password }: CreateUserParams = req.body;
  const user: User = {
    id: uuidv4(),
    age,
    login,
    password,
    isDeleted: false
  };

  users.push(user);
  res.sendStatus(OK);
};

const updateUser = (req: ValidatedRequest<UpdateUserSchema>, res: Response) => {
  const user: UpdateUserParams = { ...req.body };
  if (user.id) {
    users = users.map((u: User) => (u.id === user.id) ? { ...u, ...user } : u);
    res.sendStatus(OK);
  } else {
    res.sendStatus(NO_CONTENT);
  }  
}

const suggestUsers = (req: Request<SuggestParams>, res: Response) => {
  const { login, limit }: SuggestParams = req.params;
  if (login && limit) {
    res.send(getAutoSuggestUsers(login, +limit));
  } else {
    res.sendStatus(NOT_FOUND);
  }
}

const removeUser = (req: Request<RemoveUserParams>, res: Response) => {
  const { id }: RemoveUserParams = req.params;
  const index = users.findIndex(u => u.id === id);
  if (index >= 0) {
    users[index].isDeleted = true;
    res.send({ id });
  } else {
    res.sendStatus(NOT_FOUND);
  }
}

export {
  getAppRootResponse,
  getUser,
  getList,
  createUser,
  updateUser,
  suggestUsers,
  removeUser
};