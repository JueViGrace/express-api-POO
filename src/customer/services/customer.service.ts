import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { CustomerEntity } from '../models/entities/customer.entity';
import { CustomerDTO } from '../models/dto/customer.dto';
import { UpdateCustomerDTO } from '../models/dto/update-customer.dto';

export class CustomerService extends BaseService<CustomerEntity> {
  constructor() {
    super(CustomerEntity);
  }

  async findAllCustomer(): Promise<CustomerEntity[]> {
    return (await this.execRepository).find();
  }

  async findCustomerById(id: string): Promise<CustomerEntity | null> {
    return (await this.execRepository).findOne({ where: [{ id }] });
  }

  async createCustomer(body: CustomerDTO): Promise<CustomerEntity> {
    return (await this.execRepository).save(body);
  }

  async updateCustomer(
    id: string,
    body: UpdateCustomerDTO,
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, body);
  }

  async deleteCustomer(id: string): Promise<DeleteResult> {
    return (await this.execRepository).softDelete(id);
  }
}
