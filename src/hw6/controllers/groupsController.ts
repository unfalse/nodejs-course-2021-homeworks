import { ModelDefined } from 'sequelize/types';

import { sequelize } from '../data-access';
import { logMethod } from '../logs/logmethod';
import { AbstractController, MethodResult, MethodResultPlural, UpdateResult } from '../types/abstract';
import { Group } from '../types/group';
import { UserGroup } from '../types/usergroup';

export class GroupsController extends AbstractController<Group> {
    userGroupModel: ModelDefined<UserGroup, UserGroup>;

    constructor(groupModelInst: ModelDefined<Group, Group>, userGroupModelInst: ModelDefined<UserGroup, UserGroup>) {
        super(groupModelInst);
        this.userGroupModel = userGroupModelInst;
    }

    async create(group: Group): Promise<object> {
        let resultError;
        try {
            await this.model.create(group);
        } catch (error) {
            logMethod('GroupsController.create', `group = ${JSON.stringify(group)}`, error);
            resultError = error;
        }
        return resultError;
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

    async getAllGroups(): Promise<MethodResultPlural<Group>> {
        try {
            return {
                entities: await this.model.findAll()
            }
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
            return {
                updatedEntities
            }
        } catch (err) {
            logMethod('GroupController.update', `name = ${name}, permissions = ${JSON.stringify(permissions)}`, err);
        }
    }

    async addUsersToGroup(userGroups: Array<UserGroup>): Promise<boolean> {
        try {
            await sequelize.transaction(async (t) => {

                const userGroup = await this.userGroupModel.bulkCreate(
                    userGroups,
                    { transaction: t, returning: true }
                );
                return userGroup;

            });
            return false;
        } catch (err) {
            logMethod('GroupController.addUsersToGroup', `userGroups = ${JSON.stringify(userGroups)}`, err);
            return true;
        }
    }
}