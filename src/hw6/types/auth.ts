export interface Auth {
    login: string;
    password: string;
}

export interface TokenAuth {
    accessToken?: string;
    refreshToken?: string;
}
