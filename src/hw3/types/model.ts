import { Model } from 'sequelize';
import { User } from './user';

export interface UserInterface extends Model<User>, User { }
