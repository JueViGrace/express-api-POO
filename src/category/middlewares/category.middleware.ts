import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { CategoryDTO } from '../models/dto/category.dto';
import { validate } from 'class-validator';
import { UpdateCategoryDTO } from '../models/dto/update-category.dto';

export class CategoryMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  createCategoryValidator(req: Request, res: Response, next: NextFunction) {
    const { categoryName } = req.body;

    const valid = new CategoryDTO();

    valid.categoryName = categoryName;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }

  updateCategoryValidator(req: Request, res: Response, next: NextFunction) {
    const { categoryName } = req.body;

    const valid = new UpdateCategoryDTO();

    valid.categoryName = categoryName;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
