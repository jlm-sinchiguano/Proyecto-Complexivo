import { Body, Controller, Delete, Get, HttpException, HttpStatus, Injectable, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ValueTransformer } from 'typeorm';
import { isNullOrUndefined } from 'util';
import { CreateMaterial, UpdateMaterial } from './dtos/material.dto';
import { MaterialService } from './material.service';

@Controller('material')
export class MaterialController {
    constructor(private materialService: MaterialService) { }

    @Get('')
    async index(@Query() params: any) {
        const material = await this.materialService.getAll();
        return {
            data: material,
            message: `Lista de materiales`,
        };
    }

    @Get(':id')
    async getone(@Param('id', ParseIntPipe) id: number) {
        const response = await this.materialService.getOne(id);
        return {
            data: response,
            message: `Material ${id}`,
        };
    }

    @Post('')
    async create(@Body() payload: CreateMaterial) {
        try {
            const response = await this.materialService.create(payload);
            return {
                data: response,
                message: `Material creado`,
            };
        } catch (error) {
            if (error.code === '23505') {
                throw new HttpException('Material ya existe', HttpStatus.CONFLICT)
            } else {
                throw new HttpException('Error al crear material', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateMaterial) {
        try {
            const response = await this.materialService.update(id, payload);
            return {
                data: response,
                message: `Actualizado material ${id}`,
            };
        } catch (error) {
            if (error.code === '23505') {
                throw new HttpException('Material ya existe', HttpStatus.CONFLICT)
            } else {
                throw new HttpException('Error al editar material', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const response = await this.materialService.delete(id);
        return {
            data: response,
            message: `Eliminado material ${id}`
        }
    }
}



