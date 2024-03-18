import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';
import { HttpResponse } from '../../shared/response/http.response';
import { DeleteResult, UpdateResult } from 'typeorm';

export class CustomerController {
  constructor(
    private readonly customerService: CustomerService = new CustomerService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getCustomers(_req: Request, res: Response) {
    try {
      const data = await this.customerService.findAllCustomer();

      if (data.length === 0) {
        return this.httpResponse.NotFound(res, 'Customers not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async getCustomerById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.customerService.findCustomerById(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'Customer not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async getCustomerWithRelation(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.customerService.findCustomerWithRelation(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'Customer not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async createCustomer(req: Request, res: Response) {
    try {
      const data = await this.customerService.createCustomer(req.body);
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async updateCustomer(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.customerService.updateCustomer(
        id,
        req.body,
      );

      if (!data.affected) {
        return this.httpResponse.NotFound(res, 'Failed to update customer');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async deleteCustomer(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.customerService.deleteCustomer(id);

      if (!data.affected) {
        return this.httpResponse.NotFound(res, 'Failed to delete user');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }
}
