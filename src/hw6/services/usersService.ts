import { v4 } from 'uuid';

import { UsersController } from '../controllers';
import { AbstractService, MethodResult, MethodResultPlural, UpdateResult } from '../types/abstract';
import { User } from '../types/user';

export class UsersService extends AbstractService<User, UsersController> {
    suggestUsers(login: string, limit: number): Promise<MethodResultPlural<User>> {
        return this.controller.suggestUsers(login, limit);
    }

    update(user: User): Promise<UpdateResult> {
        return this.controller.update(user);
    }

    remove(id: string): Promise<void> {
        return this.controller.remove(id);
    }

    create({ age, login, password }: User): Promise<void> {
        const user: User = {
            age,
            id: v4(),
            login,
            password,
            isdeleted: false
        };
        return this.controller.create(user);
    }

    get(id: string): Promise<MethodResult<User>> {
        return this.controller.get(id);
    }

    async login(login: string, password: string) {
        await this.controller.login(login, password);
    }
}
