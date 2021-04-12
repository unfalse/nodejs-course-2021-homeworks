export type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export type SuggestParams = {
    limit: string;
    login: string;
}

export type RemoveUserParams = Pick<User, 'id'>;
export type UpdateUserParams = Pick<User, 'age' | 'login' | 'password'>;
export type CreateUserParams = Pick<User, 'age' | 'login' | 'password'>;

export type RemoveUserResult = string | null;
export type UpdateUserResult = boolean;
