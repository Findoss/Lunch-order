type NextFunction = () => Promise<void>;

export type MiddlewareFn<C> = (ctx: C, next: NextFunction) => Promise<void>;
