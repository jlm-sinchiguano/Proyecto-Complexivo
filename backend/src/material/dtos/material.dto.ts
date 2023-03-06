import { IsMilitaryTime, IsNumber, IsOptional, IsPositive, IsString, Max, MaxLength, Min, MinLength, } from 'class-validator';
import { PartialType } from '@nestjs/swagger';


export class CreateMaterial {

    @IsString({ message: 'El campo nombre debe ser string.' })
    @MinLength(2, { message: 'El campo nombre debe tener mínimo 2 caracteres.' })
    @MaxLength(150, { message: 'El campo nombre debe tener máximo 150 caracteres.' })
    readonly nameMaterial: string;

    @IsNumber()
    @IsOptional()
    @Min(0.1, { message: 'Ancho mínimo 0.1' })
    @Max(500, { message: 'Ancho máximo 500' })
    readonly widthMaterial: number = null ;

    @IsNumber()
    @IsOptional()
    @Min(0.1, { message: 'Largo mínimo 0.1' })
    @Max(500, { message: 'Largo máximo 500' })
    readonly lengthMaterial: number = null;

    @IsNumber()
    @IsOptional()
    @Min(0.1, { message: 'Peso mínimo 0.1' })
    @Max(5000, { message: 'Peso máximo 5000' })
    readonly weightMaterial: number = null;

    @IsNumber()
    @IsOptional()
    @Min(1, { message: 'Cantidad mínimo 1' })
    @Max(5000, { message: 'Cantidad máximo 5000' })
    readonly quantityMaterial: number = null;

    @IsNumber()
    @IsOptional()
    @Min(0.1, { message: 'Medida mínimo 0.1' })
    extentMaterial: number = null;

    @IsNumber()
    @Min(0.00001, { message: 'Precio mínimo 0.00001' })
    @Max(50000, { message: 'Precio máximo 50000' })
    readonly priceMaterial: number;

    @IsNumber({}, {message:'El campo idUnitMeasure debe ser un numero'})
    @IsPositive({message:'El campo idUnitMeasure debe ser un entero positivo'})
    readonly idUnitMeasure:number;

    @IsString({ message: 'El campo tipo de material debe ser string.' })
    @MinLength(2, { message: 'El campo tipo material debe tener mínimo 2 caracteres.' })
    @MaxLength(150, { message: 'El campo tipo debe tener máximo 150 caracteres.' })
    readonly typeMaterial: string;
}

export class UpdateMaterial extends PartialType(CreateMaterial) { }