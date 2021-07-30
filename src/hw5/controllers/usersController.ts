import { ModelDefined, Op } from 'sequelize';
import { logMethod } from '../logs/logmethod';

import { User, UsersControllerBase } from '../types';
import { UserMethodResult, UsersSuggestResult, UsersUpdateResult } from '../types/common';
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
            const [updatedUsers]: [number] =
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await this.userModel.update(userValues, { where: { login: user.login }, returning: false }) as [number];
            result.updatedUsers = updatedUsers;
            return result;
        }
        catch(err) {
            logMethod('updateUser', `user = ${JSON.stringify(user)}`, err);
        }
    }

    async suggestUsers(login: string, limit: number): Promise<UsersSuggestResult> {
        try {
            return {
                users: await this.userModel.findAll({ limit, where: { login: { [Op.like]: `%${login}%` } } })
            }
        }
        catch(err) {
            logMethod('suggestUsers', `login = ${login}, limit = ${limit}`, err);
        }
    }

    async removeUser(id: string): Promise<void> {
        try{
            await this.userModel.destroy({ where: { id } });
        }
        catch(err) {
            logMethod('removeUser', `id = ${id}`, err);
        }
    }

    async createUser(user: User): Promise<void> {
        try {
            await this.userModel.create(user);
        }
        catch(err) {
            logMethod('createUser', `user = ${user}`, err);
        }
    }

    async getUser(id: string): Promise<UserMethodResult> {
        try {
            return {
                user: await this.userModel.findByPk(id)
            };
        }
        catch(err) {
            logMethod('getUser', `id = ${id}`, err);
        }
    }
}
