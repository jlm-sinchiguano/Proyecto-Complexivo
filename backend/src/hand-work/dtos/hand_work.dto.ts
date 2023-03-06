import { IsMilitaryTime, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength, } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Timestamp } from 'typeorm';

export class CreateHandWork{

    @IsOptional()
    idHandWork: number

    @IsString({ message: 'El campo nombre debe ser string.' })
    @MinLength(2, { message: 'El campo nombre debe tener mínimo 2 caracteres.' })
    @MaxLength(100, { message: 'El campo nombre debe tener máximo 100 caracteres.' })
    readonly nameHandWork: string;

    @IsOptional()
    @IsString({ message: 'El campo descripción debe ser string.' })
    @MinLength(2, { message: 'El campo descripción debe tener mínimo 2 caracteres.' })
    @MaxLength(200, { message: 'El campo descripción debe tener máximo 200 caracteres.' })
    readonly descriptionHandWork: string = null;

    @IsNumber()
    @Min(0.1, { message: 'Sueldo mínimo 0.1' })
    @Max(1000, { message: 'Sueldo máximo 1000' })
    readonly salary: number;

    @IsNumber()
    @Min(1, { message: 'horas mínimo 1 al mes' })
    @Max(500, { message: 'horas máximo 500 al mes' })
    readonly hoursMonth: number;

    @IsNumber()
    @IsOptional()
    @Min(0.00001, { message: 'Precio hora mínimo 0.00001' })
    @Max(5000, { message: 'Precio hora máximo 5000' })
    readonly priceHour: number;

}

export class UpdateHandWork extends PartialType(CreateHandWork) { }