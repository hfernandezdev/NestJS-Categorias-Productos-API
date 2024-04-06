import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {

  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getProducts(): Promise <Category[]> {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number): Promise <Category> {
    return this.categoriesService.getCategory(id);
  }

  @Post()
  createProduct(@Body() newProduct: CreateCategoryDto) {
    return this.categoriesService.createCategory(newProduct);
  }

}
