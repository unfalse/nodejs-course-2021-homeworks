import { Request, Response } from 'express';
// import { checkToken } from '../middlewares/auth';

import { OK, SERVER_ERROR } from '../models/constants';
import { groupsServiceInstance } from '../models/instances';
import { CRUDRouter, UpdateResult } from '../types/abstract';
import { Group } from '../types/group';
import {
  validator,
  createGroupSchema,
  updateGroupSchema,
  ValidatedRequest,
  CreateGroupSchema,
  UpdateGroupSchema
} from '../validation';

class GroupsRouter extends CRUDRouter {

  constructor() {
      super();
      this.router.get('/get/:id', this.get);
      this.router.post('/new', validator.body(createGroupSchema), this.create);
      this.router.put('/update', validator.body(updateGroupSchema), this.update);
      this.router.delete('/remove/:id', this.remove);
      this.router.get('/list', this.getAllGroups);
      this.router.post('/add', this.addUsersToGroup);
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    if (id) {
        const { entity } = await groupsServiceInstance.get(id);
        res.json(entity);
    }
  }

  async create(req: ValidatedRequest<CreateGroupSchema>, res: Response) {
    const { name, permissions } = req.body;
    const group: Group = { name, permissions, id: '' };
    await groupsServiceInstance.create(group);
    res.sendStatus(OK);
  }

  async update(req: ValidatedRequest<UpdateGroupSchema>, res: Response) {
    const { name, permissions } = req.body;
    const group: Group = { name, permissions, id: ''};
    const updateResult: UpdateResult = await groupsServiceInstance.update(group);
    res.status(OK).send(`Rows updated: ${updateResult.updatedEntities}`);
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    await groupsServiceInstance.remove(id);
    res.sendStatus(OK);
  }

  async getAllGroups(req: Request, res: Response) {
    const { entities } = await groupsServiceInstance.getAllGroups();
    res.json(entities);
  }

  async addUsersToGroup(req: Request, res: Response) {
    const { groupId, userIds } = req.body;
    const errorFlag = await groupsServiceInstance.addUsersToGroup(groupId, userIds);
    if (errorFlag) {
        res.sendStatus(SERVER_ERROR);
    } else {
        res.sendStatus(OK);
    }
    
  }
}

const groupsRouter = new GroupsRouter();

export { groupsRouter };