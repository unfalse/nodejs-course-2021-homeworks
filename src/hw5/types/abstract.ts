import { Request, Response, Router } from 'express';
import { ModelDefined } from 'sequelize';
import { UserError } from './common';

export interface MethodResult extends UserError { }
export interface UpdateResult extends UserError {
    updatedEntities: number;
}

export abstract class AbstractController<T> {
    model: ModelDefined<T, T>;

    constructor(modelInst: ModelDefined<T, T>) {
        this.model = modelInst;
    }

    abstract create(entity: T): Promise<UserError>
    abstract get(id: string): Promise<MethodResult>
    abstract remove(id: string): Promise<UserError>
    abstract update(entity: T): Promise<UpdateResult>
}

export abstract class AbstractService<T, CTR> {
    controller: CTR;
    constructor(controllerInst: CTR) {
        this.controller = controllerInst;
    }
    abstract create(entity: T): Promise<UserError>
    abstract get(id: string): Promise<MethodResult>
    abstract remove(id: string): Promise<UserError>
    abstract update(entity: T): Promise<UpdateResult>
}

export abstract class CRUDRouter {
  router: Router;
  constructor() {
      this.router = Router();
  }

  abstract get(req: Request, res: Response)
  abstract update(req: Request, res: Response)
  abstract create(req: Request, res: Response)
  abstract remove(req: Request, res: Response)
}
