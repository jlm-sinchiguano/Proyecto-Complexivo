import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateRole, UpdateRole } from './dtos/role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) { }

    @Get('')
    async index(@Query() params: any) {
        const role = await this.roleService.getAll();
        return {
            data: role,
            message: `Lista de roles`,
        };
    }

    @Get(':id')
    async getone(@Param('id', ParseIntPipe) id: number) {
        const response = await this.roleService.getOne(id);
        return {
            data: response,
            message: `Rol ${id}`,
        };
    }

    @Post('')
    async create(@Body() payload: CreateRole) {
        const response = await this.roleService.create(payload);
        return {
            data: response,
            message: `Rol creado`,
        };
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateRole) {
        const response = await this.roleService.update(id, payload);
        return {
            data: response,
            message: `Actualizado rol ${id}`,
        };
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const response = await this.roleService.delete(id);
        return {
            data: response,
            message: `Eliminado rol ${id}`
        }
    }
}
