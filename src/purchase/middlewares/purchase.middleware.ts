import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { PurchaseDTO } from '../models/dto/purchase.dto';
import { validate } from 'class-validator';
import { UpdatePurchaseDTO } from '../models/dto/update-purchase.dto';

export class PurchaseMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  createPurchaseValidator(req: Request, res: Response, next: NextFunction) {
    const { status, paymentMethod, customer } = req.body;

    const valid = new PurchaseDTO();

    valid.status = status;
    valid.paymentMethod = paymentMethod;
    valid.customer = customer;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }

  updatePurchaseValidator(req: Request, res: Response, next: NextFunction) {
    const { status, paymentMethod, customer } = req.body;

    const valid = new UpdatePurchaseDTO();

    valid.status = status;
    valid.paymentMethod = paymentMethod;
    valid.customer = customer;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
