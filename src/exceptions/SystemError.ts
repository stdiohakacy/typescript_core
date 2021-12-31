import { mapTemplate } from "../libs/common";
import { ErrorObject } from "./ErrorObject";

export class SystemError extends Error {
    code: string;
    httpCode: number;

    constructor(errObj: ErrorObject, ...params) {
        super();
        this.httpCode = 400;
        this.code = errObj.code;
        this.message = params && params.length ? mapTemplate(errObj.message, ...params) : errObj.message;
    }
}
