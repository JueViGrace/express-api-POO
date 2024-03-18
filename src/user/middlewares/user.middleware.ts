import { NextFunction, Request, Response } from 'express';
import { UserDTO } from '../models/dto/user.dto';
import { validate } from 'class-validator';
import { HttpResponse } from '../../shared/response/http.response';
import { UpdateUserDTO } from '../models/dto/update-user.dto';
import { SharedMiddleware } from '../../shared/middlewares/shared.middleware';

export class UserMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }

  createUserValidator(req: Request, res: Response, next: NextFunction) {
    const { name, lastname, username, email, password, city, province, role } =
      req.body;

    if (role) {
      return this.httpResponse.BadRequest(res, 'Role should not exist.');
    }

    const valid = new UserDTO();

    valid.name = name;
    valid.lastname = lastname;
    valid.username = username;
    valid.email = email;
    valid.password = password;
    valid.city = city;
    valid.province = province;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }

  updateUserValidator(req: Request, res: Response, next: NextFunction) {
    const { name, lastname, username, email, password, city, province } =
      req.body;

    const valid = new UpdateUserDTO();

    valid.name = name;
    valid.lastname = lastname;
    valid.username = username;
    valid.email = email;
    valid.password = password;
    valid.city = city;
    valid.province = province;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
