import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService) {}

  @Get('/active-categories')
  @ApiOperation({ summary: 'Listar productos de categorías activas', description: 'Obtiene una lista de productos pertenecientes a categorías activas.' })
  @ApiResponse({ status: 200, description: 'Éxito' })
  async findAllActiveCategoriesProducts(): Promise<Product[]> {
    return this.productsService.findAllActiveCategoriesProducts();
  }

  @Get('/by-talle')
  @ApiOperation({ summary: 'Listar productos por talle', description: 'Obtiene una lista de productos cuyo talle sea MEDIUM o LARGE.' })
  @ApiResponse({ status: 200, description: 'Éxito' })
  async findMediumLargeProducts(): Promise<Product[]> {
    return this.productsService.findMediumLargeProducts();
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos', description: 'Obtiene una lista de todos los productos disponibles en la base de datos.' })
  @ApiResponse({ status: 200, description: 'Éxito' })
  getProducts(): Promise <Product[]> {
    return this.productsService.getProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por su ID', description: 'Obtiene un producto específico por su ID.' })
  @ApiResponse({ status: 200, description: 'Éxito' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  getProduct(@Param('id') id: string): Promise <Product> {
    return this.productsService.getProduct(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto', description: 'Crea un nuevo producto en la base de datos.' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
  @ApiBody({ type: CreateProductDto })
  createProduct(@Body() newProduct: CreateProductDto) {
    return this.productsService.createProduct(newProduct);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto', description: 'Elimina un producto existente de la base de datos.' })
  @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto existente', description: 'Actualiza un producto existente en la base de datos.' })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiBody({ type: UpdateProductDto })
  updateProduct(@Param('id') id: string, @Body() product: UpdateProductDto) {
    return this.productsService.updateProduct(id, product);
  }

}
