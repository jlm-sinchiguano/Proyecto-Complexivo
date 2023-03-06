import { IsMilitaryTime, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength, } from 'class-validator';
import { PartialType } from '@nestjs/swagger';


export class CreateQuotation {

    @IsString({ message: 'El campo nombre debe ser string.' })
    @MinLength(2, { message: 'El campo nombre debe tener mínimo 2 caracteres.' })
    @MaxLength(150, { message: 'El campo nombre debe tener máximo 150 caracteres.' })
    readonly nameQuotation: string;

    @IsOptional()
    @IsString({ message: 'El campo descripción debe ser string.' })
    @MinLength(2, { message: 'El campo descripción debe tener mínimo 2 caracteres.' })
    @MaxLength(200, { message: 'El campo descripción debe tener máximo 200 caracteres.' })
    readonly descriptionQuotation: string = null;

    @IsNumber()
    @Min(0.0001, { message: 'Porcentaje mínimo 0.0001' })
    @Max(100, { message: 'Porcentaje máximo 100' })
    readonly percentageProfit: number;

    @IsNumber()
    @IsOptional()
    @Min(0.00001, { message: 'Precio mínimo 0.00001' })
    @Max(50000, { message: 'Precio máximo 50000' })
    readonly salePrice: number;  

}

export class UpdateQuotation extends PartialType(CreateQuotation) { }