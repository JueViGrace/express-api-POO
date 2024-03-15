import { BaseRouter } from '../../shared/router/router';
import { ProductController } from '../controllers/product.controller';

export class ProductRouter extends BaseRouter<ProductController> {
  constructor() {
    super(ProductController);
  }

  routes(): void {
    this.router.get('/products', (req, res) =>
      this.controller.getProducts(req, res),
    );

    this.router.get('/products/:id', (req, res) =>
      this.controller.getProductById(req, res),
    );

    this.router.post('/products/create', (req, res) =>
      this.controller.createProduct(req, res),
    );

    this.router.patch('/products/update/:id', (req, res) =>
      this.controller.updateProduct(req, res),
    );

    this.router.delete('/products/delete/:id', (req, res) =>
      this.controller.deleteProduct(req, res),
    );
  }
}
