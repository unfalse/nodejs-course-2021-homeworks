import { Model, ModelDefined } from 'sequelize';
import { UserError, UserMethodResult, UsersUpdateResult } from './common';
import { User } from './user';

export type UsersControllerResult = Promise<Model<User, User>>;

export interface UsersControllerBase {
    userModel: ModelDefined<User, User>;
    getUser(id: string): Promise<UserMethodResult>;
    createUser(user: User): Promise<UserError>;
    updateUser(user: User): Promise<UsersUpdateResult>;
    suggestUsers(login: string, limit: number): UsersControllerResult[];
    removeUser(id: string): Promise<UserError>;
}
