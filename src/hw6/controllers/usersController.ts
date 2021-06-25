import { Model, Op } from 'sequelize';
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

    async create(user: User): Promise<void> {
        try {
            await this.model.create(user);
        }
        catch(err) {
            logMethod('createUser', `user = ${user}`, err);
        }
    }

    async get(id: string): Promise<MethodResult<User>> {
        try {
            return {
                entity: await this.model.findByPk(id)
            };
        }
        catch(err) {
            logMethod('getUser', `id = ${id}`, err);
        }
    }

    async login(login: string, password: string) {
        let users: Array<Model<User, User>> = null;

        try {
            users = await this.model.findAll({ limit: 10, where: { login: { [Op.like]: `%${login}%` } } });
            if (users.length === 1) {
                const user: User = (users[0].get() as unknown) as User;
                console.log('user');
                console.log(user);
                if (user.login === login && user.password) {
                    console.log('TRUE');
                }
                return;
            }
            
        }
        catch(err) {
            logMethod('login', `login = ${login}, password = ${password}`, err);
        }
        
    }
}
