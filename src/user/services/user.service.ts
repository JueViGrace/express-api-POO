import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { RoleType, UserDTO } from '../models/dto/user.dto';
import { UserEntity } from '../models/entities/user.entity';
import { UpdateUserDTO } from '../models/dto/update-user.dto';
import * as bcrypt from 'bcrypt';

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

  async findUserWithRole(
    id: string,
    role: RoleType,
  ): Promise<UserEntity | null> {
    const user = (await this.execRepository)
      .createQueryBuilder('user')
      .where({ id })
      .andWhere({ role })
      .getOne();

    return user;
  }

  async findUserWithRelation(id: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.customer', 'customer')
      .where({ id })
      .getOne();
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ email })
      .getOne();
  }

  async findUserByUsername(username: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ username })
      .getOne();
  }

  async createUser(body: UserDTO): Promise<UserEntity> {
    const newUser = (await this.execRepository).create(body);
    const hash = await bcrypt.hash(newUser.password, 10);

    newUser.password = hash;
    newUser.role = RoleType.USER;

    return (await this.execRepository).save(newUser);
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
