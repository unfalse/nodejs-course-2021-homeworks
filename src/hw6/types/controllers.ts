import { ModelDefined } from 'sequelize';
import { MethodResult, UpdateResult } from './abstract';
import { UserMethodResult, UsersSuggestResult, UsersUpdateResult } from './common';
import { User } from './user';

export interface UsersControllerBase {
    userModel: ModelDefined<User, User>;
    getUser(id: string): Promise<MethodResult<User>>;
    createUser(user: User): Promise<void>;
    updateUser(user: User): Promise<UpdateResult>;
    suggestUsers(login: string, limit: number): Promise<UsersSuggestResult>;
    removeUser(id: string): Promise<void>;
}
