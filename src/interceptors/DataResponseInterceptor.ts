import { Action, Interceptor, InterceptorInterface } from "routing-controllers";
import { PaginationResult } from "../usecase/PaginationResult";

@Interceptor()
export class DataResponseInterceptor implements InterceptorInterface {
    intercept(_action: Action, data: any) {
        if (data instanceof PaginationResult || Buffer.isBuffer(data))
            return data;
        return { data: data ?? null };
    }
}
