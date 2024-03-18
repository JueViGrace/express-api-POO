import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { HttpResponse } from '../../shared/response/http.response';
import { DeleteResult, UpdateResult } from 'typeorm';

export class ProductController {
  constructor(
    private readonly productService: ProductService = new ProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getProducts(_req: Request, res: Response) {
    try {
      const data = await this.productService.findAllProduct();

      if (data.length === 0) {
        return this.httpResponse.NotFound(res, 'Products not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.findProductById(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'Product not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async getProductWithRelation(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.findProductWithRelation(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'Product not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const data = await this.productService.createProduct(req.body);
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.productService.updateProduct(
        id,
        req.body,
      );

      if (!data.affected) {
        return this.httpResponse.NotFound(res, 'Failed to update product');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.productService.deleteProduct(id);

      if (!data.affected) {
        return this.httpResponse.NotFound(res, 'Failed to delete product');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }
}
