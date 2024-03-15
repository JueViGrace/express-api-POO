import { Request, Response } from 'express';
import { PurchaseService } from '../services/purchase.service';

export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService = new PurchaseService(),
  ) {}

  async getPurchases(_req: Request, res: Response) {
    try {
      const data = await this.purchaseService.findAllPurchase();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async getPurchaseById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseService.findPurchaseById(id);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async createPurchase(req: Request, res: Response) {
    try {
      const data = await this.purchaseService.createPurchase(req.body);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async updatePurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseService.updatePurchase(id, req.body);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async deletePurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseService.deletePurchase(id);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
}
