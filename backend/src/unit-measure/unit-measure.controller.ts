import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateUnitMeasure, UpdateUnitMeasure } from './dtos/unit_measure.dto';
import { UnitMeasureService } from './unit-measure.service';

@Controller('unit-measure')
export class UnitMeasureController {
    constructor(private unitMeasureService: UnitMeasureService) { }

    @Get('')
    async index(@Query() params: any) {
        const unitM = await this.unitMeasureService.getAll();
        return {
            data: unitM,
            message: `Lista de unidades de medida`,
        };
    }

    @Get(':id')
    async getone(@Param('id', ParseIntPipe) id: number) {
        const response = await this.unitMeasureService.getOne(id);
        return {
            data: response,
            message: `Unidad de medida ${id}`,
        };
    }

    /* @Get(':id')
    async findAll(@Param('id', ParseIntPipe) id: number) {
        const response = await this.unitMeasureService.findAll(id);
        return {
            data: response,
            message: `registros`,
        };
    } */

    @Post('')
    async create(@Body() payload: CreateUnitMeasure) {
        try {
            const response = await this.unitMeasureService.create(payload);
            return {
                data: response,
                message: `Unidad medida creado`,
            };
        } catch (error) {
            if (error.code === '23505') {
                throw new HttpException('Unidad de medida ya existe', HttpStatus.CONFLICT)
            } else {
                throw new HttpException('Error al crear unidad', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUnitMeasure) {
        try {
            const response = await this.unitMeasureService.update(id, payload);
            return {
                data: response,
                message: `Actualizado unidad de medida ${id}`,
            };
        } catch (error) {
            if (error.code === '23505') {
                throw new HttpException('Unidad de medida ya existe', HttpStatus.CONFLICT)
            } else {
                throw new HttpException('Error al editar unidad de medida', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const response = await this.unitMeasureService.delete(id);
        return {
            data: response,
            message: `Eliminado unidad de medida ${id}`
        }
    }
}

@Controller('unit')
export class UnitController {

    constructor(private unitMeasureService: UnitMeasureService) { }

    @Get(':id')
    async findAll(@Param('id', ParseIntPipe) id: number) {
        const response = await this.unitMeasureService.findAll(id);
        return {
            data: response,
            message: `registros`,
        };
    }
}