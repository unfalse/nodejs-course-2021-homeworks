import { v4 } from 'uuid';

import { UsersControllerBase } from '../types';
import { UsersServiceBase, UsersServiceResult } from '../types/services';
import { User } from '../types/user';

export class UsersService implements UsersServiceBase {
    controller: UsersControllerBase;

    constructor(controllerInst: UsersControllerBase) {
        this.controller = controllerInst;
    }

    getList(): UsersServiceResult[] {
        throw new Error('Method not implemented.');
    }

    updateUser(user: User): Promise<number> {
        return this.controller.updateUser(user);
    }

    removeUser(id: string): UsersServiceResult[] {
        throw new Error('Method not implemented.');
    }

    createUser({ age, login, password }: User): void {
        const user: User = {
            age,
            id: v4(),
            login,
            password,
            isdeleted: false
        };
        this.controller.createUser(user);
    }

    getUser(id: string): UsersServiceResult {
        return this.controller.getUser(id);
    }
}
