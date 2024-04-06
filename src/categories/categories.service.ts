import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

  getCategories() {
    return this.categoryRepository.find({ relations: ['products'] });
  }

  async getCategory(id: number) {
    const categoryFound = await this.categoryRepository.findOne({
      where: {
        id
      }
    });

    if( !categoryFound ) {
      throw new HttpException("No se encontraron datos",  HttpStatus.NOT_FOUND);
    }

    return categoryFound;
  }

  async createCategory(category: CreateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: {
        nombre: category.nombre
      }
    });

    if (categoryFound) {
      throw new HttpException('Category already exists', HttpStatus.CONFLICT);
    }

    const newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }
}


