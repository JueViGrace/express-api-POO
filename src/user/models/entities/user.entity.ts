import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../config/base.entity';
import { CustomerEntity } from '../../../customer/models/entities/customer.entity';
import { RoleType } from '../dto/user.dto';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  city: string;

  @Column()
  province: string;

  @Column({ type: 'enum', enum: RoleType, nullable: false })
  role: RoleType;

  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer: CustomerEntity;
}
