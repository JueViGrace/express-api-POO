import e, { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { PurchaseProductDTO } from '../models/dto/purchase-product.dto';
import { validate } from 'class-validator';
import { UpdatePurchaseProductDTO } from '../models/dto/update-purchase-product.dto';

export class PurchaseProductsMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  createPurchaseProductsValidator(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { quantityProduct, totalPrice, purchase, product } = req.body;

    const valid = new PurchaseProductDTO();

    valid.quantityProduct = quantityProduct;
    valid.totalPrice = totalPrice;
    valid.purchase = purchase;
    valid.product = product;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }

  updatePurchaseProductsValidator(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { quantityProduct, totalPrice, purchase, product } = req.body;

    const valid = new UpdatePurchaseProductDTO();

    valid.quantityProduct = quantityProduct;
    valid.totalPrice = totalPrice;
    valid.purchase = purchase;
    valid.product = product;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
