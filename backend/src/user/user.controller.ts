import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateUser, UpdateUser } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get('')
    async index(@Query() params: any) {
        const user = await this.userService.getAll();
        return {
            data: user,
            message: `Lista de usuarios`,
        };
    }

    @Get(':id')
    async getone(@Param('id', ParseIntPipe) id: number) {
        const response = await this.userService.getOne(id);
        return {
            data: response,
            message: `Usuario ${id}`,
        };
    }

    @Post('')
    async create(@Body() payload: CreateUser) {
        const response = await this.userService.create(payload);
        return {
            data: response,
            message: `Usuario creado`,
        };
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUser) {
        const response = await this.userService.update(id, payload);
        return {
            data: response,
            message: `Actualizado usuario ${id}`,
        };
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const response = await this.userService.delete(id);
        return {
            data: response,
            message: `Eliminado usuario ${id}`
        }
    }
}
