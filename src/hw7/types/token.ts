export interface TokenModel {
    id: string;
    tokenId: string;
    userId: string;
}

export interface TokenModelAuth {
    tokenId: string;
    userId: string;
}

export enum TOKEN_TYPES {
    ACCESS = 'ACCESS_TOKEN',
    REFRESH = 'REFRESH_TOKEN',
}

export const TOKEN_KEY_SECRETS = {
    [TOKEN_TYPES.ACCESS]: 'TOKEN_SECRET',
    [TOKEN_TYPES.REFRESH]: 'REFRESH_TOKEN_SECRET',
};

export type PayloadRefreshToken = {
    id: string;
    type: TOKEN_TYPES;
};

export type PayloadAccessToken = {
    userId: string;
    type: TOKEN_TYPES;
};
