import { v4 as uuidv4 } from 'uuid';

import { CreateUserParams, RemoveUserResult, UpdateUserParams, UpdateUserResult, User } from './types';

export class UserService {
    users: Array<User> = [];

    getAutoSuggestUsers = (loginSubstring: string, limit: number): User[] =>
        this.users.filter((u: User) =>
            u.login.toLowerCase().includes(loginSubstring.toLowerCase())
        ).slice(0, limit);

    createUser = ({ age, login, password }: CreateUserParams): void => {
        const user: User = {
            id: uuidv4(),
            age,
            login,
            password,
            isDeleted: false
        };
        this.users.push(user);
    }

    getUser = (id: string): User | null => this.users.find((u: User) => u.id === id) ?? null;

    getList = (): User[] => this.users;

    updateUser = (userValues: UpdateUserParams): UpdateUserResult => {
        const user: User | undefined = this.users.find(u => userValues.login === u.login);
        if (!user) {
            return false;
        }
        this.users = this.users.map((u: User) => (u.login === userValues.login) ? { ...u, ...userValues } : u);
        return true;
    }

    removeUser = (id: string): RemoveUserResult => {
        const index = this.users.findIndex(u => u.id === id);
        if (index >= 0) {
            this.users[index].isDeleted = true;
            return this.users[index].id as unknown as RemoveUserResult;
        }
        return null;
    }
}
