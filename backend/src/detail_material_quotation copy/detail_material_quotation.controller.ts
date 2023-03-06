import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { DetailMaterialQuotationService } from './detail_material_quotation.service';
import { CreateDetailMaterialQuotation, UpdateDetailMaterialQuotation } from './dtos/detail_material_quotation.dto';


@Controller('detail-material-quotation')
export class DetailMaterialQuotationController {

    constructor(private detailMQService: DetailMaterialQuotationService) { }

    @Get('')
    async index(@Query() params: any) {
        const detailMQ = await this.detailMQService.getAll();
        return {
            data: detailMQ,
            message: `Lista de detalle material cotización`,
        };
    }

    @Get(':id')
    async getone(@Param('id', ParseIntPipe) id: number) {
        const response = await this.detailMQService.getOne(id);
        return {
            data: response,
            message: `Detalle ${id}`,
        };
    }

    @Post('')
    async create(@Body() payload: CreateDetailMaterialQuotation) {
        const response = await this.detailMQService.create(payload);
        return {
            data: response,
            message: `Detalle creado`,
        };
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateDetailMaterialQuotation) {
        const response = await this.detailMQService.update(id, payload);
        return {
            data: response,
            message: `Actualizado detalle ${id}`,
        };
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const response = await this.detailMQService.delete(id);
        return {
            data: response,
            message: `Eliminado detalle ${id}`
        }
    }
    
}

@Controller('price-material')
export class DetailMQController {

    constructor(private detailMQService: DetailMaterialQuotationService) { }


    @Get(':id')
    async findAll(@Param('id', ParseIntPipe) id: number) {
        const response = await this.detailMQService.findAll(id);
        return {
            data: response,
            message: `registros`,
        };
    }
}


