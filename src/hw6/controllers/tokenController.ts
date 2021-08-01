import { ModelDefined } from 'sequelize/types';
import { v4 } from 'uuid';

import { logMethod } from '../logs/logmethod';
import { AbstractController, MethodResult, UpdateResult } from '../types/abstract';
import { TokenModel, TokenModelAuth } from '../types/token';

export class TokenController {
    model: ModelDefined<TokenModel, TokenModel>;

    constructor(modelInst: ModelDefined<TokenModel, TokenModel>) {
        this.model = modelInst;
    }

    async add(tokenAuth: TokenModelAuth): Promise<boolean> {
        try {
            await this.model.create({ ...tokenAuth, id: v4() });
        } catch (error) {
            logMethod('add', `tokenAuth = ${tokenAuth}`, error);
            return true;
        }
        return false;
    }

    async updateByUserId(tokenAuth: TokenModelAuth): Promise<UpdateResult> {
        try {
            const [updatedEntities]: [number] =
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await this.model.update(
                    tokenAuth,
                    {
                        where: { userId: tokenAuth.userId },
                        returning: false
                    }) as [number];
            return { updatedEntities };
        } catch (error) {
            logMethod('updateByUserId', `tokenAuth = ${tokenAuth}`, error);
        }
    }

    async updateByTokenId(tokenAuth: Partial<TokenModelAuth>): Promise<UpdateResult> {
        try {
            const [updatedEntities]: [number] =
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await this.model.update(
                    tokenAuth,
                    {
                        where: { tokenId: tokenAuth.tokenId },
                        returning: false
                    }) as [number];
            return { updatedEntities };
        } catch (error) {
            logMethod('updateByTokenId', `tokenAuth = ${tokenAuth}`, error);
        }
    }

    async findByUserId(userId: string): Promise<MethodResult<TokenModel>> {
        try {
            return{
                entity: await this.model.findOne({ where: { userId } })
            }
        } catch (error) {
            logMethod('findByUserId', `userId = ${userId}`, error);
        }
    }

    async findByTokenId(tokenId: string): Promise<MethodResult<TokenModel>> {
        try {
            return {
                entity: await this.model.findOne({ where: { tokenId } })
            }
        } catch (error) {
            logMethod('findByUserId', `tokenId = ${tokenId}`, error);
        }
    }
}