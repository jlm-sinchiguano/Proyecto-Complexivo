import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateHandWork, UpdateHandWork } from './dtos/hand_work.dto';
import { HandWorkService } from './hand-work.service';


@Controller('hand-work')
export class HandWorkController {

    constructor(private handWorkService: HandWorkService) { }

    @Get('')
    async index(@Query() params: any) {
        const handWork = await this.handWorkService.getAll();
        return {
            data: handWork,
            message: `Lista de mano de obra`,
        };
    }

    @Get(':id')
    async getone(@Param('id', ParseIntPipe) id: number) {
        const response = await this.handWorkService.getOne(id);
        return {
            data: response,
            message: `Mano de obra ${id}`,
        };
    }

    @Post('')
    async create(@Body() payload: CreateHandWork) {
        try {
            const response = await this.handWorkService.create(payload);
            return {
                data: response,
                message: `Mano de obra creado`,
            };
        } catch (error) {
            if (error.code === '23505') {
                throw new HttpException('Mano de Obra ya existe', HttpStatus.CONFLICT)
            } else {
                throw new HttpException('Error al crear mano de obra', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateHandWork) {
        try {
            const response = await this.handWorkService.update(id, payload);
            return {
                data: response,
                message: `Actualizado mano de obra ${id}`,
            };
        } catch (error) {
            if (error.code === '23505') {
                throw new HttpException('Mano de obra ya existe', HttpStatus.CONFLICT)
            } else {
                throw new HttpException('Error al editar material', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const response = await this.handWorkService.delete(id);
        return {
            data: response,
            message: `Eliminado mano de obra ${id}`
        }
    }
}
