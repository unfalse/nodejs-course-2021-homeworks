import { Model } from 'sequelize';
import { User } from './user';

export interface UserError {
    errorMessage?: string;
}

export interface UsersUpdateResult extends UserError {
    updatedUsers: number;
}

export interface UsersSuggestResult extends UserError {
    users: Array<Model<User, User>>;
}

export interface UserMethodResult extends UserError {
    user: Model<User, User>;
}
