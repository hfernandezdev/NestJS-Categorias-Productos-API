import { Category } from "src/categories/category.entity";
import { Column, Entity, PrimaryGeneratedColumn,  PrimaryColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";

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

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'id_categoria' })
  categoria: Category;

  @Column()
  precio: number;

  @Column()
  talle: Talle;
}
