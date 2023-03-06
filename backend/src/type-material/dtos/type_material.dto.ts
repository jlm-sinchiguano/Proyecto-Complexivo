import { IsMilitaryTime, IsNumber, IsString, Max, MaxLength, Min, MinLength, } from 'class-validator';
import { PartialType } from '@nestjs/swagger';


export class CreateTypeMaterial {

    @IsString({ message: 'El campo nombre debe ser string.' })
    @MinLength(2, { message: 'El campo nombre debe tener mínimo 2 caracteres.' })
    @MaxLength(150, { message: 'El campo nombre debe tener máximo 150 caracteres.' })
    nameTypeMaterial: string;

}

export class UpdateTypeMaterial extends PartialType(CreateTypeMaterial) { }