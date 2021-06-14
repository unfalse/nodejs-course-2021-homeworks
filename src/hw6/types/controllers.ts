import { ModelDefined } from 'sequelize';
import { UserMethodResult, UsersSuggestResult, UsersUpdateResult } from './common';
import { User } from './user';

export interface UsersControllerBase {
    userModel: ModelDefined<User, User>;
    getUser(id: string): Promise<UserMethodResult>;
    createUser(user: User): Promise<void>;
    updateUser(user: User): Promise<UsersUpdateResult>;
    suggestUsers(login: string, limit: number): Promise<UsersSuggestResult>;
    removeUser(id: string): Promise<void>;
}
