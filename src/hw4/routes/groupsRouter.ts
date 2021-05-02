import { Request, Response } from 'express';

import { OK, SERVER_ERROR } from '../models/constants';
import { groupsServiceInstance } from '../models/instances';
import { CRUDRouter, UpdateResult } from '../types/abstract';
import { GroupMethodResult, GroupsResult, UserError } from '../types/common';
import { Group } from '../types/group';

class GroupsRouter extends CRUDRouter {
    
  router: any;

  constructor() {
      super();
      this.router.get('/get/:id', this.get);
      this.router.post('/new', this.create);
      this.router.put('/update', this.update);
      this.router.delete('/remove/:id', this.remove);
      this.router.get('/list', this.getAllGroups);
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    if (id) {
        const { group, errorMessage }: GroupMethodResult = await groupsServiceInstance.get(id);
        if (!group && errorMessage) {
            res.status(SERVER_ERROR).send(`Error has happened! ${errorMessage}`);
            return;
        }
        res.json(group);
    }
  }

  async create(req: Request, res: Response) {
    const { name, permissions } = req.body;
    const group: Group = { name, permissions, id: '' };
    const { errorMessage }: UserError = await groupsServiceInstance.create(group);
    if (errorMessage) {
        res.status(SERVER_ERROR).send(`Error has happened! ${errorMessage}`);
        return;
    }
    res.sendStatus(OK);
  }

  async update(req: Request, res: Response) {
    const { name, permissions } = req.body;
    const group: Group = { name, permissions, id: ''};
    const updateResult: UpdateResult = await groupsServiceInstance.update(group);
    if (updateResult.errorMessage) {
        res.status(SERVER_ERROR).send(`Error has happened! ${updateResult.errorMessage}`);
        return;
    }
    res.status(OK).send(`Rows updated: ${updateResult.updatedEntities}`);
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    const { errorMessage }: UserError = await groupsServiceInstance.remove(id);
    if (errorMessage) {
        res.status(SERVER_ERROR).send(`Error has happened! ${errorMessage}`);
        return;
    }
    res.sendStatus(OK);
  }

  async getAllGroups(req: Request, res: Response) {
    const { groups, errorMessage }: GroupsResult = await groupsServiceInstance.getAllGroups();
    if (!groups.length && errorMessage) {
        res.status(SERVER_ERROR).send(`Error has happened! ${errorMessage}`);
        return;
    }
    res.json(groups);
  }
}

const groupsRouter = new GroupsRouter();

export { groupsRouter };