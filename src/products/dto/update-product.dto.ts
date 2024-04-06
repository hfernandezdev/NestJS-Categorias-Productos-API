import { IsIn, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Talle } from "../product.entity";

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre?: string;

  @IsNumber()
  @IsNotEmpty()
  id_categoria?: number;

  @IsNumber()
  @IsNotEmpty()
  precio?: number;

  @IsNotEmpty()
  @IsIn([Talle.SMALL, Talle.MEDIUM, Talle.LARGE, Talle.EXTRA_LARGE])
  talle?: Talle;
}