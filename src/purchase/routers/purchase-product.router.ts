import { BaseRouter } from '../../shared/router/router';
import { PurchaseProductController } from '../controllers/purchase-product.controller';

export class PurchaseRouter extends BaseRouter<PurchaseProductController> {
  constructor() {
    super(PurchaseProductController);
  }

  routes(): void {
    this.router.get('/purchaseProducts', (req, res) =>
      this.controller.getPurchaseProducts(req, res),
    );

    this.router.get('/purchaseProducts/:id', (req, res) =>
      this.controller.getPurchaseProductsById(req, res),
    );

    this.router.post('/purchaseProducts/create', (req, res) =>
      this.controller.createPurchaseProducts(req, res),
    );

    this.router.patch('/purchaseProducts/update/:id', (req, res) =>
      this.controller.updatePurchaseProducts(req, res),
    );

    this.router.delete('/purchaseProducts/delete/:id', (req, res) =>
      this.controller.deletePurchaseProducts(req, res),
    );
  }
}
