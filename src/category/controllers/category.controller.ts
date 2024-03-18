import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { HttpResponse } from '../../shared/response/http.response';
import { DeleteResult, UpdateResult } from 'typeorm';

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getCategories(_req: Request, res: Response) {
    try {
      const data = await this.categoryService.findAllCategory();

      if (data.length === 0) {
        return this.httpResponse.NotFound(res, 'Categories not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.findCategoryById(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'Category not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async getCategoryWithRelation(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.findCategoryWithRelation(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'Category not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const data = await this.categoryService.createCategory(req.body);
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.categoryService.updateCategory(
        id,
        req.body,
      );

      if (!data.affected) {
        return this.httpResponse.NotFound(res, 'Failed to update category');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.categoryService.deleteCategory(id);

      if (!data.affected) {
        return this.httpResponse.NotFound(res, 'Failed to delete category');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }
}
