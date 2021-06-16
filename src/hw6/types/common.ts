import { Model } from 'sequelize';

import { User } from './user';
import { Group } from './group';
import { MethodResult } from './abstract';

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

export interface GroupMethodResult extends MethodResult<Group> {
    group: Model<Group, Group>;
}

export interface GroupsResult extends MethodResult {
    groups: Array<Model<Group, Group>>;
}