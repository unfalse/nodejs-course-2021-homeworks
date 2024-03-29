import { Model } from 'sequelize';
import { Group } from './group';
import { TokenModel } from './token';
import { User } from './user';
import { UserGroup } from './usergroup';

export interface UserInterface extends Model<User>, User { }
export interface GroupInterface extends Model<Group>, Group { }
export interface UserGroupInterface extends Model<UserGroup>, UserGroup { }
export interface TokenModelInterface extends Model<TokenModel>, TokenModel { }