import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { CustomerDTO } from '../models/dto/customer.dto';
import { validate } from 'class-validator';
import { UpdateCustomerDTO } from '../models/dto/update-customer.dto';

export class CustomerMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  createCustomerValidator(req: Request, res: Response, next: NextFunction) {
    const { address, dni, user } = req.body;

    const valid = new CustomerDTO();

    valid.address = address;
    valid.dni = dni;
    valid.user = user;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }

  updateCustomerValidator(req: Request, res: Response, next: NextFunction) {
    const { address, dni, user } = req.body;

    const valid = new UpdateCustomerDTO();

    valid.address = address;
    valid.dni = dni;
    valid.user = user;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
