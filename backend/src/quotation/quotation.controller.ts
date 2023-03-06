import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateQuotation, UpdateQuotation } from './dtos/quotation.dto';
import { QuotationService } from './quotation.service';

@Controller('quotation')
export class QuotationController {
    constructor(private quotationService: QuotationService) { }

    @Get('')
    async index(@Query() params: any) {
        const quotation = await this.quotationService.getAll();
        return {
            data: quotation,
            message: `Lista de cotizaciones`,
        };
    }

    @Get(':id')
    async getone(@Param('id', ParseIntPipe) id: number) {
        const response = await this.quotationService.getOne(id);
        return {
            data: response,
            message: `Cotización ${id}`,
        };
    }

    @Post('')
    async create(@Body() payload: CreateQuotation) {
        try {
            const response = await this.quotationService.create(payload);
            return {
                data: response,
                message: `Cotización creado`,
            };
        } catch (error) {
            if (error.code === '23505') {
                throw new HttpException('Cotización ya existe', HttpStatus.CONFLICT)
            } else {
                throw new HttpException('Error al crear cotización', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateQuotation) {
        try {
            const response = await this.quotationService.update(id, payload);
            return {
                data: response,
                message: `Actualizado cotización ${id}`,
            };
        } catch (error) {
            if (error.code === '23505') {
                throw new HttpException('Cotización ya existe', HttpStatus.CONFLICT)
            } else {
                throw new HttpException('Error al editar cotización', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const response = await this.quotationService.delete(id);
        return {
            data: response,
            message: `Eliminado cotización ${id}`
        }
    }
}
