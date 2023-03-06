import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateTypeMaterial, UpdateTypeMaterial } from './dtos/type_material.dto';
import { TypeMaterialService } from './type-material.service';

@Controller('type-material')
export class TypeMaterialController {
    constructor(private typeMaterialService: TypeMaterialService) { }

    @Get('')
    async index(@Query() params: any) {
        const typeM = await this.typeMaterialService.getAll();
        return {
            data: typeM,
            message: `Lista de tipos de materiales`,
        };
    }

    @Get(':id')
    async getone(@Param('id', ParseIntPipe) id: number) {
        const response = await this.typeMaterialService.getOne(id);
        return {
            data: response,
            message: `Tipo material ${id}`,
        };
    }

    @Post('')
    async create(@Body() payload: CreateTypeMaterial) {
        const response = await this.typeMaterialService.create(payload);
        return {
            data: response,
            message: `Tipo material creado`,
        };
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateTypeMaterial) {
        const response = await this.typeMaterialService.update(id, payload);
        return {
            data: response,
            message: `Actualizado tipo material ${id}`,
        };
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const response = await this.typeMaterialService.delete(id);
        return {
            data: response,
            message: `Eliminado tipo material ${id}`
        }
    }
}
