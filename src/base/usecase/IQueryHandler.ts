export interface IQueryHandler<TIn, TOut> {
    handler(param: TIn): Promise<TOut>
}