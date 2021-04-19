import { Model, ModelDefined } from 'sequelize';
import { User } from './user';

export type UsersControllerResult = Promise<Model<User, User>>;

export interface UsersControllerBase {
    userModel: ModelDefined<User, User>;
    getUser(id: string): UsersControllerResult;
    createUser(user: User): UsersControllerResult;
    getList(): UsersControllerResult[];
    updateUser(user: User): Promise<number>;
    suggestUsers(login: string, limit: number): UsersControllerResult[];
    removeUser(id: string): UsersControllerResult[];
}
