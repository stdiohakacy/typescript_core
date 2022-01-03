export interface IJwtPayload {
    sub: string;
    exp: number;
    iat: number;
    iss: string;
    aud: string;
}

export interface IJwtPayloadExtend extends IJwtPayload {
    roleId: string;
}

export interface IAuthJwtService {
    sign(userId: string, roleId: string): string;
    verify(token: string): IJwtPayloadExtend;
}
