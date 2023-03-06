import { IsMilitaryTime, IsNumber, IsOptional, IsPositive, IsString, Max, MaxLength, Min, MinLength, } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { RoleEntity } from 'src/role/entities/rol.entity';


export class CreateUser{

    @IsString({ message: 'El campo nombre debe ser string.' })
    @MinLength(2, { message: 'El campo nombre debe tener mínimo 2 caracteres.' })
    @MaxLength(100, { message: 'El campo nombre debe tener máximo 100 caracteres.' })
    readonly nameUser: string;

    @IsString({ message: 'El campo contraseña debe ser string.' })
    @MinLength(1, { message: 'El campo contraseña debe tener mínimo 1 caracteres.' })
    @MaxLength(100, { message: 'El campo contraseña debe tener máximo 100 caracteres.' })
    readonly passwordUser: string;

    @IsNumber({}, {message:'El campo idRol debe ser un numero'})
    @IsPositive({message:'El campo idRol debe ser un entero positivo'})
    readonly idRol:number;

}

export class UpdateUser extends PartialType(CreateUser) { }