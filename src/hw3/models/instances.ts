import { UsersController } from '../controllers';
import { UsersService } from '../services';
import { User } from '../types';
import { userModel } from './user';

const usersControllerInstance = new UsersController<User>(userModel);
export const usersServiceInstance = new UsersService<User>(usersControllerInstance);
