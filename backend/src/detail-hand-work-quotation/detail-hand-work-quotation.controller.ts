import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { DetailHandWorkQuotationService } from './detail-hand-work-quotation.service';
import { CreateDetailHandWorkQuotation, UpdateDetailHandWorkQuotation } from './dtos/detail-hand-work-quotation.dto';


@Controller('detail-hand-work-quotation')
export class DetailHandWorkQuotationController {

    constructor(private detailHQService: DetailHandWorkQuotationService) { }

    @Get('')
    async index(@Query() params: any) {
        const detailHQ = await this.detailHQService.getAll();
        return {
            data: detailHQ,
            message: `Lista de detalle mano de obra cotización`,
        };
    }

    @Get(':id')
    async getone(@Param('id', ParseIntPipe) id: number) {
        const response = await this.detailHQService.getOne(id);
        return {
            data: response,
            message: `Detalle ${id}`,
        };
    }

    @Post('')
    async create(@Body() payload: CreateDetailHandWorkQuotation) {
        const response = await this.detailHQService.create(payload);
        return {
            data: response,
            message: `Detalle creado`,
        };
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateDetailHandWorkQuotation) {
        const response = await this.detailHQService.update(id, payload);
        return {
            data: response,
            message: `Actualizado detalle ${id}`,
        };
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const response = await this.detailHQService.delete(id);
        return {
            data: response,
            message: `Eliminado detalle ${id}`
        }
    }
    
}

@Controller('price-hand')
export class DetailHQController {

    constructor(private detailHQService: DetailHandWorkQuotationService) { }

    @Get(':id')
    async findAll(@Param('id', ParseIntPipe) id: number) {
        const response = await this.detailHQService.findAll(id);
        return {
            data: response,
            message: `registros`,
        };
    }
}
