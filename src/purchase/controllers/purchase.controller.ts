import { Request, Response } from 'express';
import { PurchaseService } from '../services/purchase.service';
import { HttpResponse } from '../../shared/response/http.response';
import { DeleteResult, UpdateResult } from 'typeorm';

export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService = new PurchaseService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getPurchases(_req: Request, res: Response) {
    try {
      const data = await this.purchaseService.findAllPurchase();

      if (data.length === 0) {
        return this.httpResponse.NotFound(res, 'Purchases not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async getPurchaseById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseService.findPurchaseById(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'Purchase not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async getPurchaseWithRelation(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseService.findPurchaseWithRelation(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'Purchase not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async createPurchase(req: Request, res: Response) {
    try {
      const data = await this.purchaseService.createPurchase(req.body);
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async updatePurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.purchaseService.updatePurchase(
        id,
        req.body,
      );

      if (!data.affected) {
        return this.httpResponse.NotFound(res, 'Failed to update purchase');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async deletePurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.purchaseService.deletePurchase(id);

      if (!data.affected) {
        return this.httpResponse.NotFound(res, 'Failed to delete purchase');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }
}
