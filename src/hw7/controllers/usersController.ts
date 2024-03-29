import { Op } from 'sequelize';
import { logMethod } from '../logs/logmethod';

import { User } from '../types/user';
import { AbstractController, MethodResult, MethodResultPlural, UpdateResult } from '../types/abstract';

export class UsersController extends AbstractController<User> {
    async update(user: User): Promise<UpdateResult> {
        try {
            const [updatedEntities]: [number] =
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await this.model.update({
                    age: user.age,
                    login: user.login,
                    password: user.password
                }, { where: { login: user.login }, returning: false }) as [number];
            return { updatedEntities };
        }
        catch(err) {
            logMethod('updateUser', `user = ${JSON.stringify(user)}`, err);
        }
    }

    async suggestUsers(login: string, limit: number): Promise<MethodResultPlural<User>> {
        try {
            return {
                entities: await this.model.findAll({ limit, where: { login: { [Op.like]: `%${login}%` } } })
            }
        }
        catch(err) {
            logMethod('suggestUsers', `login = ${login}, limit = ${limit}`, err);
        }
    }

    async remove(id: string): Promise<void> {
        try{
            await this.model.destroy({ where: { id } });
        }
        catch(err) {
            logMethod('removeUser', `id = ${id}`, err);
        }
    }

    async create(user: User): Promise<object> {
        let resultError;
        try {
            await this.model.create(user);
        }
        catch(error) {
            logMethod('createUser', `user = ${user}`, error);
            console.log(JSON.stringify(error, null, 4));
            resultError = error;
        }
        return resultError;
    }

    async get(id: string): Promise<MethodResult<User>> {
        try {
            return {
                entity: await this.model.findByPk(id)
            };
        }
        catch(err) {
            logMethod('getUser', `id = ${id}`, err);
            return;
        }
    }

    async findByLogin(login: string): Promise<MethodResult<User>> {
        try {
            const user = await this.model.findOne({ where: { login }});
            return {
                entity: user
            }
        } catch(error) {
            logMethod('findByLogin', `login = ${login}`, error);
            return;
        }
    }
}
