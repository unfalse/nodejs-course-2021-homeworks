import { Model, ModelDefined } from 'sequelize';

export type UsersControllerResult<U> = Promise<Model<U, U>>;

export interface UsersControllerBase<U> {
    userModel: ModelDefined<U, U>;
    getUser(id: string): UsersControllerResult<U>;
    createUser(user: U): UsersControllerResult<U>;
    getList(): UsersControllerResult<U>[];
    updateUser(user: U): UsersControllerResult<U>[];
    suggestUsers(login: string, limit: number): UsersControllerResult<U>[];
    removeUser(id: string): UsersControllerResult<U>[];
}
