import { IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, MaxLength, Min, MinLength, } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Unique } from 'typeorm';


export class CreateUnitMeasure {

    @IsOptional()
    idUnitMeasure: number

    @IsString({ message: 'El campo nombre debe ser string.' })
    @MinLength(2, { message: 'El campo nombre debe tener mínimo 2 caracteres.' })
    @MaxLength(50, { message: 'El campo nombre debe tener máximo 50 caracteres.' })
    readonly nameUnitMeasure: string;

    @IsString({ message: 'El campo abreviación debe ser string.' })
    @MinLength(1, { message: 'El campo abreviación debe tener mínimo 1 caracteres.' })
    @MaxLength(5, { message: 'El campo abreviación debe tener máximo 5 caracteres.' })
    readonly abbreviation: string;

    @IsNumber()
    @Min(0.0001, { message: 'Multiplicación mínimo 0.0001' })
    readonly multiplication: number;  

    @IsPositive({message:'El campo typeMaterial debe ser un entero positivo'})
    typeMaterial:number;

}

export class UpdateUnitMeasure extends PartialType(CreateUnitMeasure) { }