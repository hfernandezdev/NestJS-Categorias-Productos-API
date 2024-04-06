import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService) {}

  @Get('/active-categories')
  async findAllActiveCategoriesProducts(): Promise<Product[]> {
    return this.productsService.findAllActiveCategoriesProducts();
  }

  @Get('/by-talle')
  async findMediumLargeProducts(): Promise<Product[]> {
    return this.productsService.findMediumLargeProducts();
  }

  @Get()
  getProducts(): Promise <Product[]> {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Promise <Product> {
    return this.productsService.getProduct(id);
  }

  @Post()
  createProduct(@Body() newProduct: CreateProductDto) {
    return this.productsService.createProduct(newProduct);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() product: UpdateProductDto) {
    return this.productsService.updateProduct(id, product);
  }

}
