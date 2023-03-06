import { IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, MaxLength, Min, MinLength, } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { IsNull, Timestamp } from 'typeorm';

export class CreateDetailMaterialQuotation {

    @IsNumber()
    @IsOptional()
    @Min(0.1, { message: 'Ancho mínimo 0.1' })
    @Max(500, { message: 'Ancho máximo 500' })
    readonly widthDetail: number = null;

    @IsNumber()
    @IsOptional()
    @Min(0.1, { message: 'Largo mínimo 0.1' })
    @Max(500, { message: 'Largo máximo 500' })
    readonly lengthDetail: number = null;

    @IsNumber()
    @IsOptional()
    @Min(0.1, { message: 'Peso mínimo 0.1' })
    @Max(5000, { message: 'Peso máximo 5000' })
    readonly weightDetail: number = null;

    @IsNumber()
    @IsOptional()
    @Min(1, { message: 'Cantidad mínimo 1' })
    @Max(5000, { message: 'Cantidad máximo 5000' })
    readonly quantityDetail: number = null;

    @IsNumber()
    @IsOptional()
    @Min(0.1, { message: 'Medida mínimo 0.1' })
    readonly extentDetail: number = null;

    @IsNumber()
    @IsOptional()
    @Min(0.00001, { message: 'Precio detalle mínimo 0.00001' })
    @Max(50000, { message: 'Precio detalle máximo 50000' })
    readonly priceDetail: number;

    @IsOptional()
    @IsNumber({}, {message:'El campo idMaterial debe ser un numero'})
    @IsPositive({message:'El campo idMaterial debe ser un entero positivo'})
    readonly idMaterial:number;

    @IsNumber({}, {message:'El campo idQuotation debe ser un numero'})
    @IsPositive({message:'El campo idQuotation debe ser un entero positivo'})
    readonly idQuotation:number;

    @IsNumber({}, {message:'El campo idUnitMeasure debe ser un numero'})
    @IsPositive({message:'El campo idUnitMeasure debe ser un entero positivo'})
    readonly idUnitMeasure:number;

    @IsString({ message: 'El campo tipo de material debe ser string.' })
    @MinLength(2, { message: 'El campo tipo material debe tener mínimo 2 caracteres.' })
    @MaxLength(150, { message: 'El campo tipo debe tener máximo 150 caracteres.' })
    readonly typeMaterial: string;

}

export class UpdateDetailMaterialQuotation extends PartialType(CreateDetailMaterialQuotation) { }