import { Model } from 'sequelize';
import { Group } from './group';
import { User } from './user';

export interface UserInterface extends Model<User>, User { }
export interface GroupInterface extends Model<Group>, Group { }