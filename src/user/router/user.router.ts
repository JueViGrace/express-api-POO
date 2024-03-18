import { BaseRouter } from '../../shared/router/router';
import { UserController } from '../controllers/user.controller';
import { UserMiddleware } from '../middlewares/user.middleware';

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
  constructor() {
    super(UserController, UserMiddleware);
  }

  routes(): void {
    this.router.get('/users', (req, res) => this.controller.getUsers(req, res));

    this.router.get('/users/:id', (req, res) =>
      this.controller.getUserById(req, res),
    );

    this.router.get('/users/customer/:id', (req, res) =>
      this.controller.getUserWithRelation(req, res),
    );

    this.router.post(
      '/users/create',
      (req, res, next) => [this.middleware.createUserValidator(req, res, next)],
      (req, res) => this.controller.createUser(req, res),
    );

    this.router.patch(
      '/users/update/:id',
      (req, res, next) => [this.middleware.updateUserValidator(req, res, next)],
      (req, res) => this.controller.updateUser(req, res),
    );

    this.router.delete(
      '/users/delete/:id',
      this.middleware.passAuth('jwt'),
      (req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
      (req, res) => this.controller.deleteUser(req, res),
    );
  }
}
