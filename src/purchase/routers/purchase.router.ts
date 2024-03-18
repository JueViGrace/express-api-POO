import { BaseRouter } from '../../shared/router/router';
import { PurchaseController } from '../controllers/purchase.controller';
import { PurchaseMiddleware } from '../middlewares/purchase.middleware';

export class PurchaseRouter extends BaseRouter<
  PurchaseController,
  PurchaseMiddleware
> {
  constructor() {
    super(PurchaseController, PurchaseMiddleware);
  }

  routes(): void {
    this.router.get('/purchases', (req, res) =>
      this.controller.getPurchases(req, res),
    );

    this.router.get('/purchases/:id', (req, res) =>
      this.controller.getPurchaseById(req, res),
    );

    this.router.get('/purchases/rel/:id', (req, res) =>
      this.controller.getPurchaseWithRelation(req, res),
    );

    this.router.post(
      '/purchases/create',
      (req, res, next) => [
        this.middleware.createPurchaseValidator(req, res, next),
      ],
      (req, res) => this.controller.createPurchase(req, res),
    );

    this.router.patch(
      '/purchases/update/:id',
      (req, res, next) => [
        this.middleware.updatePurchaseValidator(req, res, next),
      ],
      (req, res) => this.controller.updatePurchase(req, res),
    );

    this.router.delete('/purchases/delete/:id', (req, res) =>
      this.controller.deletePurchase(req, res),
    );
  }
}
