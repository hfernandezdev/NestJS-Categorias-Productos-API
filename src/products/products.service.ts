import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 } from "uuid";

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

  getProducts() {
    return this.productRepository.find({ relations: ['categoria'] });
  }

  async getProduct(id: string) {
    const productFound = await this.productRepository.findOne({
      where: {
        id
      }
    });

    if( !productFound ) {
      throw new HttpException("No se encontraron datos",  HttpStatus.NOT_FOUND);
    }

    return productFound;
  }

  async createProduct(product: CreateProductDto) {
    const productFound = await this.productRepository.findOne({
      where: {
        codigo: product.codigo,
      }
    });

    if (productFound) {
      throw new HttpException('Product already exists', HttpStatus.CONFLICT);
    }

    product['id'] = v4();
    product['categoria'] = { id: product.id_categoria };

    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  async deleteProduct(id: string) {
    const productFound = await this.productRepository.findOne({
      where: {
        id
      }
    });

    if( !productFound ) {
      throw new HttpException("No se encontraron datos",  HttpStatus.NOT_FOUND);
    }

    return this.productRepository.delete({ id });
  }

  async updateProduct(id: string, product: UpdateProductDto) {
    const result = await this.productRepository.update({ id }, product);

    if (result.affected === 0) {
      throw new HttpException("No se encontraron datos",  HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async findAllActiveCategoriesProducts(): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.categoria', 'categoria')
      .where('categoria.activa = :activa', { activa: true })
      .getMany();
}

  async findMediumLargeProducts(): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .where('product.talle = :medium OR product.talle = :large', { medium: 'MEDIUM', large: 'LARGE' })
      .getMany();
  }
}
