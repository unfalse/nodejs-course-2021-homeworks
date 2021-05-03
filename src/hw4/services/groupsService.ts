import { v4 } from 'uuid';
import { GroupsController } from '../controllers';

import { AbstractService, UpdateResult } from '../types/abstract';
import { GroupMethodResult, GroupsResult, UserError } from '../types/common';
import { Group } from '../types/group';

export class GroupsService extends AbstractService<Group, GroupsController> {
    get(id: string): Promise<GroupMethodResult> {
      return this.controller.get(id) as Promise<GroupMethodResult>;
    }

    getAllGroups(): Promise<GroupsResult> {
        return this.controller.getAllGroups();
    }

    create({ name, permissions }: Group): Promise<UserError> {
      const group: Group = {
        id: v4(),
        name,
        permissions
      };
      return this.controller.create(group);
    }

    remove(id: string): Promise<UserError> {
        return this.controller.remove(id);
    }

    update(group: Group): Promise<UpdateResult> {
        return this.controller.update(group);
    }
}

