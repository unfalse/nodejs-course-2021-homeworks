export interface UserBase {
    id: string;
    login: string;
    password: string;
    age: number;
    isdeleted: boolean;
}

export type User = UserBase
