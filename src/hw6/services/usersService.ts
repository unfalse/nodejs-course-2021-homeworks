import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

import { UsersController } from '../controllers';
import { AbstractService, MethodResult, MethodResultPlural, UpdateResult } from '../types/abstract';
import { User } from '../types/user';
import { BCRYPT } from '../lib/bcrypt';

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

    async create({ age, login, password }: User): Promise<object> {
        // TODO: add logic to check if a user with such login already exists
        const user: User = {
            age,
            id: v4(),
            login,
            password: await bcrypt.hash(password, BCRYPT.SALT_ROUNDS),
            isdeleted: false
        };
        return this.controller.create(user);
    }

    get(id: string): Promise<MethodResult<User>> {
        return this.controller.get(id);
    }

    findByLogin(login: string) {
        return this.controller.findByLogin(login);
    }
}
