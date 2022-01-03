import * as jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { AUTH_SECRET_OR_PRIVATE_KEY, DOMAIN, PROJECT_NAME, PROTOTYPE } from '../../configs/Configuration';
import { AUTH_SECRET_OR_PUBLIC_KEY, AUTH_SIGNATURE } from './../../configs/Configuration';
import { IAuthJwtService, IJwtPayloadExtend } from './IAuthJwtService';

@Service('auth_jwt.service')
export class AuthJwtService implements IAuthJwtService {
    sign(userId: string, roleId: string): string {
        return jwt.sign({ roleId }, AUTH_SECRET_OR_PRIVATE_KEY, 
            {
                subject: userId,
                expiresIn: 24 * 60 * 60,
                issuer: PROJECT_NAME,
                audience: `${PROTOTYPE}://${DOMAIN}`,
                algorithm: AUTH_SIGNATURE
            } as jwt.SignOptions
        );
    }
    verify(token: string): IJwtPayloadExtend {
        return jwt.verify(token, AUTH_SECRET_OR_PUBLIC_KEY, {
            issuer: PROJECT_NAME,
            audience: `${PROTOTYPE}://${DOMAIN}`,
            algorithm: AUTH_SIGNATURE
        } as jwt.VerifyOptions) as IJwtPayloadExtend;
    }
}