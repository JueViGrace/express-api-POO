import { BaseRouter } from '../../shared/router/router';
import { ProductController } from '../controllers/product.controller';
import { ProductMiddleware } from '../middlewares/product.middleware';

export class ProductRouter extends BaseRouter<
  ProductController,
  ProductMiddleware
> {
  constructor() {
    super(ProductController, ProductMiddleware);
  }

  routes(): void {
    this.router.get('/products', (req, res) =>
      this.controller.getProducts(req, res),
    );

    this.router.get('/products/:id', (req, res) =>
      this.controller.getProductById(req, res),
    );

    this.router.get('/products/rel/:id', (req, res) =>
      this.controller.getProductWithRelation(req, res),
    );

    this.router.post(
      '/products/create',
      (req, res, next) => [
        this.middleware.createProductValidator(req, res, next),
      ],
      (req, res) => this.controller.createProduct(req, res),
    );

    this.router.patch(
      '/products/update/:id',
      (req, res, next) => [
        this.middleware.updateProductValidator(req, res, next),
      ],
      (req, res) => this.controller.updateProduct(req, res),
    );

    this.router.delete('/products/delete/:id', (req, res) =>
      this.controller.deleteProduct(req, res),
    );
  }
}
