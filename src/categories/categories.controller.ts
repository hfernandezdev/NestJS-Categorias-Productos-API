import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categorías')
@Controller('categories')
export class CategoriesController {

  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías', description: 'Obtiene una lista de todas las categorías disponibles en la base de datos.' })
  @ApiResponse({ status: 200, description: 'Éxito' })
  getProducts(): Promise <Category[]> {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por su ID', description: 'Obtiene una categoría específica por su ID.' })
  @ApiResponse({ status: 200, description: 'Éxito' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  getProduct(@Param('id', ParseIntPipe) id: number): Promise <Category> {
    return this.categoriesService.getCategory(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría', description: 'Crea una nueva categoría en la base de datos.' })
  @ApiResponse({ status: 201, description: 'Categoría creada exitosamente' })
  createProduct(@Body() newProduct: CreateCategoryDto) {
    return this.categoriesService.createCategory(newProduct);
  }

}
