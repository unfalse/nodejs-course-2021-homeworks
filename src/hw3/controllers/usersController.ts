import { ModelDefined } from 'sequelize';

import { User, UsersControllerBase } from '../types';
import { UsersControllerResult } from '../types/controllers';
import { UpdateUserParams } from '../types/services';

export class UsersController implements UsersControllerBase {
    userModel: ModelDefined<User, User>;

    constructor(userModelInst: ModelDefined<User, User>) {
        this.userModel = userModelInst;
    }

    async updateUser(user: User): Promise<number> {
        const userValues: UpdateUserParams = {
            age: user.age,
            login: user.login,
            password: user.password
        };
        try {
            const [updatedUsers]: [number] =
                // I'm declining to take part in this "WhereOptions" typing insanity!
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await this.userModel.update(userValues, { where: { login: user.login }, returning: false }) as [number];
            return updatedUsers;
        } catch (e) {
            throw new Error(e);
        }
    }

    suggestUsers(login: string, limit: number): UsersControllerResult[] {
        throw new Error('Method not implemented.');
    }

    removeUser(id: string): UsersControllerResult[] {
        throw new Error('Method not implemented.');
    }

    getList(): UsersControllerResult[] {
        throw new Error('Method not implemented.');
    }

    async createUser(user: User): UsersControllerResult {
        try {
            const newUser = await this.userModel.create(user);
            return newUser;
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async getUser(id: string): UsersControllerResult {
        try {
            const user = await this.userModel.findByPk(id);
            return user;
        } catch (e) {
            throw new Error('Database access error');
        }
    }
}
