import { ErrorObject } from './ErrorObject';
import { BaseError } from './BaseError';

export class LogicalError extends BaseError {
    constructor(errObj: ErrorObject, ...params: (string | number | boolean | { t: string })[]) {
        super();
        this.httpCode = 400;
        this.code = errObj.code;
        this.name = 'LogicalError';
        this.message = JSON.stringify({ key: errObj.message, params });
    }
}
