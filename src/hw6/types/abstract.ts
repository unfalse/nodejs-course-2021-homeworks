import { Request, Response, Router } from 'express';
import { Model, ModelDefined } from 'sequelize';

export interface MethodResult<T> {
    entity: Model<T, T>;
}

export interface MethodResultPlural<T> {
    entities: Array<Model<T, T>>;
}

export interface UpdateResult {
    updatedEntities: number;
}

export abstract class AbstractController<T> {
    model: ModelDefined<T, T>;

    constructor(modelInst: ModelDefined<T, T>) {
        this.model = modelInst;
    }

    abstract create(entity: T): Promise<void>
    abstract get(id: string): Promise<MethodResult<T>>
    abstract remove(id: string): Promise<void>
    abstract update(entity: T): Promise<UpdateResult>
}

export abstract class AbstractService<T, CTR> {
    controller: CTR;
    constructor(controllerInst: CTR) {
        this.controller = controllerInst;
    }
    abstract create(entity: T): Promise<void>
    abstract get(id: string): Promise<MethodResult<T>>
    abstract remove(id: string): Promise<void>
    abstract update(entity: T): Promise<UpdateResult>
}

export abstract class RouterBase {
    router: Router;
    constructor() {
        this.router = Router();
    }
}

export abstract class CRUDRouter extends RouterBase {
    constructor() {
        super();
    }

    abstract get(req: Request, res: Response)
    abstract update(req: Request, res: Response)
    abstract create(req: Request, res: Response)
    abstract remove(req: Request, res: Response)
}
