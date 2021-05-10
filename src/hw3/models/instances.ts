import { UsersController } from '../controllers';
import { UsersService } from '../services';
import { userModel } from './user';

const usersControllerInstance = new UsersController(userModel);
export const usersServiceInstance = new UsersService(usersControllerInstance);
