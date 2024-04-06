import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  activa: boolean;
}
