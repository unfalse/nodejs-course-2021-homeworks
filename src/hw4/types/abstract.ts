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

export abstract class AbstractService<T> {
    controller: AbstractController<T>;
    constructor(controllerInst: AbstractController<T>) {
        this.controller = controllerInst;
    }
    abstract create(entity: T): Promise<UserError>
    abstract get(id: string): Promise<MethodResult>
    abstract remove(id: string): Promise<UserError>
    abstract update(entity: T): Promise<UpdateResult>
}

export abstract class CRUDRouter {
  router: any;
  constructor() {
      this.router = Router();
      // this.router.get('/get/:id', this.get);
      // this.router.post('/new', this.getValidatorForCreate(), this.create);
      // this.router.put('/update', this.getValidatorForUpdate(), this.update);
      // this.router.delete('/remove/:id', this.remove);
  }

  abstract get(req: Request, res: Response)
  abstract update(req: Request, res: Response)
  abstract create(req: Request, res: Response)
  abstract remove(req: Request, res: Response)

  // abstract getValidatorForCreate();
  // abstract getValidatorForUpdate();
}
