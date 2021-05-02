import { UsersController, GroupsController } from '../controllers';
import { UsersService, GroupsService } from '../services';
import { groupModel } from './group';
import { userModel } from './user';

const usersControllerInstance = new UsersController(userModel);
const groupsControllerInstance = new GroupsController(groupModel);

export const usersServiceInstance = new UsersService(usersControllerInstance);
export const groupsServiceInstance = new GroupsService(groupsControllerInstance);