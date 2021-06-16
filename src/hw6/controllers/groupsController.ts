import { ModelDefined } from 'sequelize/types';

import { sequelize } from '../data-access';
import { logMethod } from '../logs/logmethod';
import { AbstractController, MethodResult, UpdateResult } from '../types/abstract';
import { GroupsResult, UserError } from '../types/common';
import { GroupMethodResult } from '../types/common';
import { Group } from '../types/group';
import { UserGroup } from '../types/usergroup';

export class GroupsController extends AbstractController<Group> {
    userGroupModel: ModelDefined<UserGroup, UserGroup>;

    constructor(groupModelInst: ModelDefined<Group, Group>, userGroupModelInst: ModelDefined<UserGroup, UserGroup>) {
        super(groupModelInst);
        this.userGroupModel = userGroupModelInst;
    }

    async create(group: Group): Promise<void> {
        try {
            await this.model.create(group);
        } catch (err) {
            logMethod('GroupsController.create', `group = ${JSON.stringify(group)}`, err);
        }
    }

    async get(id: string): Promise<MethodResult<Group>> {
        try {
            return {
                entity: await this.model.findByPk(id)
            }
        } catch (err) {
            logMethod('GroupsController.create', `id = ${id}`, err);
        }
    }

    async getAllGroups(): Promise<GroupsResult> {
        const result: GroupsResult = {
            groups: []
        };
        try {
            const groups = await this.model.findAll();
            result.groups = groups;
            return result;
        } catch (err) {
            logMethod('GroupsController.getAllGroups', `none`, err);
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await this.model.destroy({ where: { id } });
        } catch (err) {
            logMethod('GroupsController.remove', `id = ${id}`, err);
        }
    }

    suggest(login: string, limit: number): void {
        throw new Error('Method not implemented.');
    }
    
    async update({ name, permissions }: Group): Promise<UpdateResult> {
        const groupValues: Pick<Group, 'name'|'permissions'> = {
            name,
            permissions
        };
        const result: UpdateResult = {
            updatedEntities: 0
        };
        try {
            const [updatedEntities]: [number] = (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await this.model.update(groupValues, { where: { name }, returning: false }) as [number]
            );
            result.updatedEntities = updatedEntities;
            return result;
        } catch (err) {
            logMethod('GroupController.update', `name = ${name}, permissions = ${JSON.stringify(permissions)}`, err);
        }
    }

    async addUsersToGroup(userGroups: Array<UserGroup>): Promise<UserError> {
        const result: UserError = {};
        try {
            await sequelize.transaction(async (t) => {

                const userGroup = await this.userGroupModel.bulkCreate(
                    userGroups,
                    { transaction: t, returning: true }
                );
                return userGroup;

            });
            return result;
        } catch (err) {
            logMethod('GroupController.addUsersToGroup', `userGroups = ${JSON.stringify(userGroups)}`, err);
        }
    }
}