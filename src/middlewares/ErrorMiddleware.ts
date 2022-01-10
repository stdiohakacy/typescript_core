import { Response } from 'express';
import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import { IRequest } from '../controller/IRequest';
import { AccessDeniedError } from '../exceptions/AccessDeniedError';
import { InternalServerError } from '../exceptions/InternalServerError';
import { SystemError } from '../exceptions/SystemError';

@Middleware({ type: 'after' })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
    error(err: SystemError, _req: IRequest, res: Response) {
        if (!err.code || !err.httpCode) {
            err = new InternalServerError();
        }
        else {
            if (err.httpCode === 403)
                err = new AccessDeniedError();
        }
        res.send({
            code: err.code,
            message: err.message
        }).status(err.httpCode);
    }
}
