import { BaseEntity, Column, Entity, Index, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'usuarios' })
export class User extends BaseEntity {
  @Column({ length: 30, default: '' })
  nombre: string;

  @Column({ length: 30, default: '', primary: true })
  username: string;

  @Column({ default: '' })
  password: string;

  @Column({ length: 30, default: '' })
  @Index('vendedor')
  vendedor: string;

  @Column({ length: 2, default: '' })
  almacen: string;

  @Column({ type: 'decimal', precision: 2, scale: 0, default: 0 })
  desactivo: number;

  @UpdateDateColumn()
  fechamodifi: Date;

  @Column({ type: 'decimal', precision: 4, scale: 0 })
  ualterprec: number;

  @UpdateDateColumn()
  sesionactiva: Date;

  @Column({ type: 'datetime', default: '0001-01-01 01:01:01' })
  ult_sinc: Date;

  @Column({ length: 30, default: '1.0.0' })
  version: string;

  @Column({ default: 0 })
  sesion: number;
}
