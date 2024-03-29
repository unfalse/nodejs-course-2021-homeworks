import { UsersController, GroupsController } from '../controllers';
import { TokenController } from '../controllers/tokenController';
import { UsersService, GroupsService } from '../services';
import { TokenService } from '../services/tokenService';
import { groupModel } from './group';
import { tokenModel } from './token';
import { userModel } from './user';
import { userGroupModel } from './userGroup';

const usersControllerInstance = new UsersController(userModel);
const groupsControllerInstance = new GroupsController(groupModel, userGroupModel);
const tokenControllerInstance = new TokenController(tokenModel);

export const usersServiceInstance = new UsersService(usersControllerInstance);
export const groupsServiceInstance = new GroupsService(groupsControllerInstance);
export const tokenServiceInstance = new TokenService(tokenControllerInstance);