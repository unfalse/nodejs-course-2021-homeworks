import { v4 } from 'uuid';

import { UsersControllerBase } from '../types';
import { UserError, UserMethodResult, UsersSuggestResult, UsersUpdateResult } from '../types/common';
import { UsersServiceBase } from '../types/services';
import { User } from '../types/user';

export class UsersService implements UsersServiceBase {
    controller: UsersControllerBase;

    constructor(controllerInst: UsersControllerBase) {
        // super(controllerInst);
        this.controller = controllerInst;
    }

    suggestUsers(login: string, limit: number): Promise<UsersSuggestResult> {
        return this.controller.suggestUsers(login, limit);
    }

    updateUser(user: User): Promise<UsersUpdateResult> {
        return this.controller.updateUser(user);
    }

    removeUser(id: string): Promise<UserError> {
        return this.controller.removeUser(id);
    }

    createUser({ age, login, password }: User): Promise<UserError> {
        const user: User = {
            age,
            id: v4(),
            login,
            password,
            isdeleted: false
        };
        return this.controller.createUser(user);
    }

    getUser(id: string): Promise<UserMethodResult> {
        return this.controller.getUser(id);
    }
}
