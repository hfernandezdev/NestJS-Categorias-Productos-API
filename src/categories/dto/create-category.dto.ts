import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ example: 'Categoría de ejemplo', description: 'Nombre de la categoría' })
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ example: 'Descripción de la categoría', description: 'Descripción de la categoría' })
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true, description: 'Indica si la categoría está activa' })
  activa: boolean;
}
