import { IsMilitaryTime, IsNumber, IsString, Max, MaxLength, Min, MinLength, } from 'class-validator';
import { PartialType } from '@nestjs/swagger';


export class CreateRole{

    @IsString({ message: 'El campo nombre debe ser string.' })
    @MinLength(2, { message: 'El campo nombre debe tener mínimo 2 caracteres.' })
    @MaxLength(100, { message: 'El campo nombre debe tener máximo 100 caracteres.' })
    readonly nameRole: string; 

}

export class UpdateRole extends PartialType(CreateRole) { }