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
        try {
            const [updatedUsers]: [number] = (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await this.userModel.update(userValues, { where: { login: user.login }, returning: false }) as [number]
            );
            result.updatedUsers = updatedUsers;
        } catch (e) {
            result.updatedUsers = 0;
            result.errorMessage = e.message;
        }
        return result;
    }

    async suggestUsers(login: string, limit: number): Promise<UsersSuggestResult> {
        const result: UsersSuggestResult = {
            users: null
        };
        try {
            const users = await this.userModel.findAll({ limit, where: { login: { [Op.like]: `%${login}%` } } });
            result.users = users;
        } catch (e) {
            result.errorMessage = e.message;
        }
        return result;
    }

    async removeUser(id: string): Promise<UserError> {
        const result: UserError = {};
        try {
            await this.userModel.destroy({ where: { id } });
        } catch (e) {
            result.errorMessage = e.message;
        }
        return result;
    }

    async createUser(user: User): Promise<UserError> {
        const result: UserError = {};
        try {
            await this.userModel.create(user);
        } catch (e) {
            result.errorMessage = e.message;
        }
        return result;
    }

    async getUser(id: string): Promise<UserMethodResult> {
        const result: UserMethodResult = {
            user: null
        };
        try {
            const user = await this.userModel.findByPk(id);
            result.user = user;
        } catch (e) {
            result.errorMessage = e.message;
        }
        return result;
    }
}
