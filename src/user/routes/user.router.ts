import { BaseRouter } from '../../router/router';
import { UserController } from '../controllers/user.controller';

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes(): void {
    this.router.get('/user', (req, res) => this.controller.getUsers(req, res));
  }
}

// import { Router } from 'express';
// import usersController from '../controllers/user.controller';

// const router = Router();

// router.get('/', usersController.getUsers);

// router.get('/:id', usersController.getUserById);

// router.post('/', usersController.createUser);

// router.patch('/:id', usersController.updateUser);

// router.delete('/:id', usersController.deleteUser);

// export default router;
