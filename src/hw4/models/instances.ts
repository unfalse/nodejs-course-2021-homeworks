import { UsersController, GroupsController } from '../controllers';
import { UsersService, GroupsService } from '../services';
import { groupModel } from './group';
import { userModel } from './user';
import { userGroupModel } from './userGroup';

const usersControllerInstance = new UsersController(userModel);
const groupsControllerInstance = new GroupsController(groupModel, userGroupModel);

export const usersServiceInstance = new UsersService(usersControllerInstance);
export const groupsServiceInstance = new GroupsService(groupsControllerInstance);