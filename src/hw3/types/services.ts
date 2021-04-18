import { Model } from 'sequelize';
import { UsersControllerBase } from './controllers';
import { User } from './user';

export type CreateUserParams = Omit<User, 'id' | 'isdeleted'>;

export type UsersServiceResult<U> = Promise<Model<U, U>>;

export interface UsersServiceBase<U> {
    controller: UsersControllerBase<U>;
    getUser(id: string): UsersServiceResult<U>;
    createUser(createParams: CreateUserParams): void;
    getList(): UsersServiceResult<U>[];
    updateUser(user: U): UsersServiceResult<U>[];
    // suggestUsers(login: string, limit: number): ControllerResult<U>[];
    removeUser(id: string): UsersServiceResult<U>[];
}

