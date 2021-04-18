import { v4 } from 'uuid';

import { UsersControllerBase } from '../types';
import { CreateUserParams, UsersServiceBase, UsersServiceResult } from '../types/services';
import { UserBase } from '../types/user';

export class UsersService<U extends UserBase> implements UsersServiceBase<U> {
    controller: UsersControllerBase<U>;

    constructor(controllerInst: UsersControllerBase<U>) {
        this.controller = controllerInst;
    }

    getList(): UsersServiceResult<U>[] {
        throw new Error('Method not implemented.');
    }

    updateUser(user: U): UsersServiceResult<U>[] {
        throw new Error('Method not implemented.');
    }

    removeUser(id: string): UsersServiceResult<U>[] {
        throw new Error('Method not implemented.');
    }

    createUser({ age, login, password }: CreateUserParams): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const user: U = {
            age,
            id: v4(),
            login,
            password,
            isdeleted: false
        };
        this.controller.createUser(user);
    }

    getUser(id: string): UsersServiceResult<U> {
        return this.controller.getUser(id);
    }
}
