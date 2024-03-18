import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { ProductDTO } from '../models/dto/product.dto';
import { validate } from 'class-validator';
import { UpdateProductDTO } from '../models/dto/update-product.dto';

export class ProductMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  createProductValidator(req: Request, res: Response, next: NextFunction) {
    const { productName, description, price, category } = req.body;

    const valid = new ProductDTO();

    valid.productName = productName;
    valid.description = description;
    valid.price = price;
    valid.category = category;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }

  updateProductValidator(req: Request, res: Response, next: NextFunction) {
    const { productName, description, price, category } = req.body;

    const valid = new UpdateProductDTO();

    valid.productName = productName;
    valid.description = description;
    valid.price = price;
    valid.category = category;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
