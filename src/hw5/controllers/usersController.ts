import { ModelDefined, Op } from 'sequelize';

import { User, UsersControllerBase } from '../types';
import { UserError, UserMethodResult, UsersSuggestResult, UsersUpdateResult } from '../types/common';
import { UpdateUserParams } from '../types/services';

export class UsersController implements UsersControllerBase {
    userModel: ModelDefined<User, User>;

    constructor(userModelInst: ModelDefined<User, User>) {
        this.userModel = userModelInst;
    }

    async updateUser(user: User): Promise<UsersUpdateResult> {
        const userValues: UpdateUserParams = {
            age: user.age,
            login: user.login,
            password: user.password
        };
        const result: UsersUpdateResult = {
            updatedUsers: 0
        };
        const [updatedUsers]: [number] =
            // TODO: тут честно, голову сломал, с типами перемудрили мне кажется, а нагуглить не смог,
            // TODO: как правильно типизировать метод
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await this.userModel.update(userValues, { where: { login: user.login }, returning: false }) as [number];
        result.updatedUsers = updatedUsers;
        return result;
    }

    async suggestUsers(login: string, limit: number): Promise<UsersSuggestResult> {
        const result: UsersSuggestResult = {
            users: null
        };
            const users = await this.userModel.findAll({ limit, where: { login: { [Op.like]: `%${login}%` } } });
            result.users = users;
        return result;
    }

    async removeUser(id: string): Promise<UserError> {
        const result: UserError = {};
            await this.userModel.destroy({ where: { id } });
        return result;
    }

    async createUser(user: User): Promise<UserError> {
        const result: UserError = {};
        await this.userModel.create(user);
        return result;
    }

    async getUser(id: string): Promise<UserMethodResult> {
        const result: UserMethodResult = {
            user: null
        };
        const user = await this.userModel.findByPk(id);
        result.user = user;
        return result;
    }
}
