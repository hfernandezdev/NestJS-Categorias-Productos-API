import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Talle {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  EXTRA_LARGE = 'EXTRA_LARGE'
}

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
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
