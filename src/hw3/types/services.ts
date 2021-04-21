import { Model } from 'sequelize';
import { UserError, UserMethodResult, UsersUpdateResult } from './common';
import { UsersControllerBase } from './controllers';
import { User } from './user';

export type CreateUserParams = Omit<User, 'id' | 'isdeleted'>;
export type UpdateUserParams = Pick<User, 'age' | 'login' | 'password'>;
export type RemoveUserParams = Pick<User, 'id'>;
export type UsersServiceResult = Promise<Model<User, User>>;

export interface UsersServiceBase {
    controller: UsersControllerBase;
    getUser(id: string): Promise<UserMethodResult>;
    createUser(createParams: CreateUserParams): Promise<UserError>;
    updateUser(user: User): Promise<UsersUpdateResult>;
    // suggestUsers(login: string, limit: number): ControllerResult<U>[];
    removeUser(id: string): Promise<UserError>;
}

