import { IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, MaxLength, Min, MinLength, } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { IsNull, Timestamp } from 'typeorm';

export class CreateDetailHandWorkQuotation {

    @IsNumber()
    @IsOptional()
    @Min(0, { message: 'Hora minima 0' })
    @Max(100, { message: 'Hora máximo 24' })
    readonly hours: number = null;

    @IsNumber()
    @IsOptional()
    @Min(0, { message: 'Minutos minimos 0' })
    @Max(500, { message: 'Minutos máximos 60' })
    readonly minutes:  number = null;

    @IsNumber()
    @IsOptional()
    @Min(0.00001, { message: 'Precio tiempo mínimo 0.00001' })
    @Max(50000, { message: 'Precio tiempo máximo 50000' })
    readonly priceTime: number;

    @IsNumber({}, {message:'El campo idQuotation debe ser un numero'})
    @IsPositive({message:'El campo idQuotation debe ser un entero positivo'})
    readonly idQuotation:number;

    @IsOptional()
    @IsNumber({}, {message:'El campo idHandWork debe ser un numero'})
    @IsPositive({message:'El campo idHandWork debe ser un entero positivo'})
    readonly idHandWork:number;
}

export class UpdateDetailHandWorkQuotation extends PartialType(CreateDetailHandWorkQuotation) { }