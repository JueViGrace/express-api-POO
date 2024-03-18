import { BaseRouter } from '../../shared/router/router';
import { PurchaseProductController } from '../controllers/purchase-product.controller';
import { PurchaseProductsMiddleware } from '../middlewares/purchase-products.middleware';

export class PurchaseProductRouter extends BaseRouter<
  PurchaseProductController,
  PurchaseProductsMiddleware
> {
  constructor() {
    super(PurchaseProductController, PurchaseProductsMiddleware);
  }

  routes(): void {
    this.router.get('/purchaseProducts', (req, res) =>
      this.controller.getPurchaseProducts(req, res),
    );

    this.router.get('/purchaseProducts/:id', (req, res) =>
      this.controller.getPurchaseProductsById(req, res),
    );

    this.router.get('/purchaseProducts/rel/:id', (req, res) =>
      this.controller.getPurchaseProductsWithRelation(req, res),
    );

    this.router.post(
      '/purchaseProducts/create',
      (req, res, next) => [
        this.middleware.createPurchaseProductsValidator(req, res, next),
      ],
      (req, res) => this.controller.createPurchaseProducts(req, res),
    );

    this.router.patch(
      '/purchaseProducts/update/:id',
      (req, res, next) => [
        this.middleware.updatePurchaseProductsValidator(req, res, next),
      ],
      (req, res) => this.controller.updatePurchaseProducts(req, res),
    );

    this.router.delete('/purchaseProducts/delete/:id', (req, res) =>
      this.controller.deletePurchaseProducts(req, res),
    );
  }
}
