import { BaseRouter } from '../../shared/router/router';
import { CustomerController } from '../controllers/customer.controller';

export class CustomerRouter extends BaseRouter<CustomerController> {
  constructor() {
    super(CustomerController);
  }

  routes(): void {
    this.router.get('/customers', (req, res) =>
      this.controller.getCustomers(req, res),
    );

    this.router.get('/customers/:id', (req, res) =>
      this.controller.getCustomerById(req, res),
    );

    this.router.post('/customers/create', (req, res) =>
      this.controller.createCustomer(req, res),
    );

    this.router.patch('/customers/update/:id', (req, res) =>
      this.controller.updateCustomer(req, res),
    );

    this.router.delete('/customers/delete/:id', (req, res) =>
      this.controller.deleteCustomer(req, res),
    );
  }
}
