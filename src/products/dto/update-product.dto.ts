import { IsIn, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Talle } from "../product.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ example: 'Nuevo nombre de producto', description: 'Nuevo nombre del producto' })
  nombre?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 2, description: 'Nuevo ID de la categoría a la que pertenece el producto' })
  id_categoria?: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 15, description: 'Nuevo precio del producto' })
  precio?: number;

  @IsNotEmpty()
  @IsIn([Talle.SMALL, Talle.MEDIUM, Talle.LARGE, Talle.EXTRA_LARGE])
  @ApiProperty({ example: 'LARGE', description: 'Nuevo talle del producto' })
  talle?: Talle;
}