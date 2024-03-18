import { Request, Response } from 'express';
import { PurchaseProductService } from '../services/purchase-products.service';
import { HttpResponse } from '../../shared/response/http.response';
import { DeleteResult, UpdateResult } from 'typeorm';

export class PurchaseProductController {
  constructor(
    private readonly purchaseProductService: PurchaseProductService = new PurchaseProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getPurchaseProducts(_req: Request, res: Response) {
    try {
      const data = await this.purchaseProductService.findAllPurchaseProducts();

      if (data.length === 0) {
        return this.httpResponse.NotFound(res, 'Purchase products not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async getPurchaseProductsById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data =
        await this.purchaseProductService.findPurchaseProductById(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'Purchase products not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async getPurchaseProductsWithRelation(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data =
        await this.purchaseProductService.findPurchaseProductWithRelation(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'Purchase products not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async createPurchaseProducts(req: Request, res: Response) {
    try {
      const data = await this.purchaseProductService.createPurchaseProduct(
        req.body,
      );
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async updatePurchaseProducts(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult =
        await this.purchaseProductService.updatePurchaseProduct(id, req.body);

      if (!data.affected) {
        return this.httpResponse.NotFound(
          res,
          'Failed to update purchase products',
        );
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async deletePurchaseProducts(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult =
        await this.purchaseProductService.deletePurchaseProduct(id);

      if (!data.affected) {
        return this.httpResponse.NotFound(
          res,
          'Failed to delete purchase products',
        );
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }
}
