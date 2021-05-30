import { ModelDefined } from 'sequelize/types';

import { sequelize } from '../../hw3/data-access';
import { AbstractController, UpdateResult } from '../types/abstract';
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

    async create(group: Group): Promise<UserError> {
        const result: UserError = {};
        try {
            await this.model.create(group);
        } catch (e) {
            result.errorMessage = e.message;
        }
        return result;
    }

    async get(id: string): Promise<GroupMethodResult> {
        const result: GroupMethodResult = {
            group: null
        };
        try {
            const group = await this.model.findByPk(id);
            result.group = group;
        } catch (e) {
            result.errorMessage = e.message;
        }
        return result;
    }

    async getAllGroups(): Promise<GroupsResult> {
        const result: GroupsResult = {
            groups: []
        };
        try {
            const groups = await this.model.findAll();
            result.groups = groups;
        } catch (e) {
            result.errorMessage = e.message;
        }
        return result;
    }

    async remove(id: string): Promise<UserError> {
        const result: UserError = {};
        try {
            await this.model.destroy({ where: { id } });
        } catch (e) {
            result.errorMessage = e.message;
        }
        return result;
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
        } catch (e) {
            result.updatedEntities = 0;
            result.errorMessage = e.message;
        }
        return result;
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
        } catch (e) {
            result.errorMessage = e.message;
        }
        return result;
    }
}