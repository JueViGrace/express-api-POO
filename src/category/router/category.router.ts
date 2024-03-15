import { BaseRouter } from '../../shared/router/router';
import { CategoryController } from '../controllers/category.controller';

export class CategoryRouter extends BaseRouter<CategoryController> {
  constructor() {
    super(CategoryController);
  }

  routes(): void {
    this.router.get('/categories', (req, res) =>
      this.controller.getCategories(req, res),
    );

    this.router.get('/categories/:id', (req, res) =>
      this.controller.getCategoryById(req, res),
    );

    this.router.post('/categories/create', (req, res) =>
      this.controller.createCategory(req, res),
    );

    this.router.patch('/categories/update/:id', (req, res) =>
      this.controller.updateCategory(req, res),
    );

    this.router.delete('/categories/delete/:id', (req, res) =>
      this.controller.deleteCategory(req, res),
    );
  }
}
