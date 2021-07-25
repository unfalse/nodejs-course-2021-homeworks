import { TokenController } from '../controllers/tokenController';
import { MethodResult, UpdateResult } from '../types/abstract';
import { TokenModel, TokenModelAuth } from '../types/token';

export class TokenService {
    controller: TokenController;

    constructor(controllerInst: TokenController) {
        this.controller = controllerInst;
    }

    async add(tokenAuth: TokenModelAuth) {
        await this.controller.add(tokenAuth);
    }

    async updateByUserId(tokenAuth: TokenModelAuth): Promise<UpdateResult> {
        return this.controller.updateByUserId(tokenAuth);
    }

    async updateByTokenId(tokenAuth: Partial<TokenModelAuth>): Promise<UpdateResult> {
        return this.controller.updateByTokenId(tokenAuth);
    }

    async findByUserId(userId: string): Promise<MethodResult<TokenModel>> {
        return this.controller.findByUserId(userId);
    }

    async findByTokenId(tokenId: string): Promise<MethodResult<TokenModel>> {
        return this.controller.findByTokenId(tokenId);
    }

    async createOrUpdateByUserId(tokenId: TokenModelAuth['tokenId'], userId: TokenModelAuth['userId']): Promise<UpdateResult> {
        const tokenRecord = tokenId && (await this.controller.findByUserId(userId));

        if (tokenRecord) {
            return await this.controller.updateByUserId({ tokenId, userId });
        }

        await this.controller.add({ tokenId, userId });
        return;
    }
}
