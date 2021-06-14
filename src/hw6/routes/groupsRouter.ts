import { Request, Response } from 'express';

import { OK, SERVER_ERROR } from '../models/constants';
import { groupsServiceInstance } from '../models/instances';
import { CRUDRouter, UpdateResult } from '../types/abstract';
import { GroupMethodResult, GroupsResult, UserError } from '../types/common';
import { Group } from '../types/group';

class GroupsRouter extends CRUDRouter {

  constructor() {
      super();
      this.router.get('/get/:id', this.get);
      this.router.post('/new', this.create);
      this.router.put('/update', this.update);
      this.router.delete('/remove/:id', this.remove);
      this.router.get('/list', this.getAllGroups);
      this.router.post('/add', this.addUsersToGroup);
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    if (id) {
        const { group }: GroupMethodResult = await groupsServiceInstance.get(id);
        res.json(group);
    }
  }

  async create(req: Request, res: Response) {
    const { name, permissions } = req.body;
    const group: Group = { name, permissions, id: '' };
    await groupsServiceInstance.create(group);
    res.sendStatus(OK);
  }

  async update(req: Request, res: Response) {
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
    const { groups }: GroupsResult = await groupsServiceInstance.getAllGroups();
    res.json(groups);
  }

  async addUsersToGroup(req: Request, res: Response) {
    const { groupId, userIds } = req.body;
    await groupsServiceInstance.addUsersToGroup(groupId, userIds);
    res.sendStatus(OK);
  }
}

const groupsRouter = new GroupsRouter();

export { groupsRouter };