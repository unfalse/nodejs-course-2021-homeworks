import { ModelDefined } from 'sequelize';

import { UsersControllerBase } from '../types';
import { UsersControllerResult } from '../types/controllers';

export class UsersController<U> implements UsersControllerBase<U> {
    userModel: ModelDefined<U, U>;

    constructor(userModelInst: ModelDefined<U, U>) {
        this.userModel = userModelInst;
    }

    updateUser(user: U): UsersControllerResult<U>[] {
        throw new Error('Method not implemented.');
    }

    suggestUsers(login: string, limit: number): UsersControllerResult<U>[] {
        throw new Error('Method not implemented.');
    }

    removeUser(id: string): UsersControllerResult<U>[] {
        throw new Error('Method not implemented.');
    }

    getList(): UsersControllerResult<U>[] {
        throw new Error('Method not implemented.');
    }


    async createUser(user: U): UsersControllerResult<U> {
        try {
            const newUser = await this.userModel.create(user);
            return newUser;
        } catch (e) {
            throw new Error('Database access error');
        }
    }

    async getUser(id: string): UsersControllerResult<U> {
        try {
            const user = await this.userModel.findByPk(id);
            return user;
        } catch (e) {
            throw new Error('Database access error');
        }
    }
}
