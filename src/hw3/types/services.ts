import { Model } from 'sequelize';
import { UsersControllerBase } from './controllers';
import { User } from './user';

export type CreateUserParams = Omit<User, 'id' | 'isdeleted'>;
export type UpdateUserParams = Pick<User, 'age' | 'login' | 'password'>;
export type RemoveUserParams = Pick<User, 'id'>;
export type UsersServiceResult = Promise<Model<User, User>>;

export interface UsersServiceBase {
    controller: UsersControllerBase;
    getUser(id: string): UsersServiceResult;
    createUser(createParams: CreateUserParams): void;
    getList(): UsersServiceResult[];
    updateUser(user: User): Promise<number>;
    // suggestUsers(login: string, limit: number): ControllerResult<U>[];
    removeUser(id: string): UsersServiceResult[];
}

