import { Column, Entity, PrimaryGeneratedColumn,  PrimaryColumn } from "typeorm";

export enum Talle {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  EXTRA_LARGE = 'EXTRA_LARGE'
}

@Entity({ name: 'products' })
export class Product {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  codigo: string;

  @Column()
  nombre: string;

  @Column()
  id_categoria: number;

  @Column()
  precio: number;

  @Column()
  talle: Talle;
}
