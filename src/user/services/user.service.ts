import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { UserDTO } from '../models/dto/user.dto';
import { UserEntity } from '../models/entities/user.entity';
import { UpdateUserDTO } from '../models/dto/update-user.dto';

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async findAllUser(): Promise<UserEntity[]> {
    return (await this.execRepository).find();
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    return (await this.execRepository).findOne({ where: [{ id }] });
  }

  async createUser(body: UserDTO): Promise<UserEntity> {
    return (await this.execRepository).save(body);
  }

  async updateUser(
    id: string,
    updateDto: UpdateUserDTO,
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, updateDto);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return (await this.execRepository).softDelete(id);
  }
}
