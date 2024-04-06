import { IsIn, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Talle } from "../product.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty({ example: '123', description: 'Código del producto' })
  codigo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ example: 'Producto de ejemplo', description: 'Nombre del producto' })
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'ID de la categoría a la que pertenece el producto' })
  id_categoria: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 10, description: 'Precio del producto' })
  precio: number;

  @IsNotEmpty()
  @IsIn([Talle.SMALL, Talle.MEDIUM, Talle.LARGE, Talle.EXTRA_LARGE])
  @ApiProperty({ example: 'MEDIUM', description: 'Talle del producto' })
  talle: Talle;
}
