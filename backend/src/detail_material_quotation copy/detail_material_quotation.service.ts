import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialService } from 'src/material/material.service';
import { QuotationService } from 'src/quotation/quotation.service';
import { UnitMeasureService } from 'src/unit-measure/unit-measure.service';
import { Repository } from 'typeorm';
import { CreateDetailMaterialQuotation, UpdateDetailMaterialQuotation } from './dtos/detail_material_quotation.dto';
import { DetailMaterialQuotationEntity } from './entities/detail_material_quotation.entity';

@Injectable()
export class DetailMaterialQuotationService {
    constructor(
        @InjectRepository(DetailMaterialQuotationEntity)
        private detailMaterialQuotationRepo: Repository<DetailMaterialQuotationEntity>,
        private materialService: MaterialService,
        private quotationService: QuotationService,
        private unitMeasureService: UnitMeasureService,
    ) { }

    async getAll() {
        return await this.detailMaterialQuotationRepo.find({
            relations:['material', 'quotation', 'unitMeasure']
        });
    }

    async findAll(id: number) {
        const priceMa  = await  this.detailMaterialQuotationRepo.find({
            relations:['material', 'quotation', 'unitMeasure'],
            where: {quotation: { idQuotation: id}}
        })
        return priceMa
    }

    async getOne(id: number) {
        const detailMQ = await this.detailMaterialQuotationRepo.findOne({ where: { idDetail: id } });
        if (detailMQ === null) {
            throw new NotFoundException('Detalle material cotización no encontrado');
        }
        return detailMQ;
    }

    async create(payload: CreateDetailMaterialQuotation) {
        const newDetailMQ = this.detailMaterialQuotationRepo.create(payload);
        newDetailMQ.material = await this.materialService.getOne(payload.idMaterial);
        newDetailMQ.quotation = await this.quotationService.getOne(payload.idQuotation);
        newDetailMQ.unitMeasure = await this.unitMeasureService.getOne(payload.idUnitMeasure);
        if (newDetailMQ.unitMeasure.idtypeMaterial.nameTypeMaterial == 'Longitud') {
            console.log('adentro')
            newDetailMQ.extentDetail = (payload.widthDetail * newDetailMQ.unitMeasure.multiplication) * (payload.lengthDetail * newDetailMQ.unitMeasure.multiplication)
            newDetailMQ.priceDetail = (newDetailMQ.extentDetail * newDetailMQ.material.priceMaterial)/ newDetailMQ.material.extentMaterial

        } else if (newDetailMQ.unitMeasure.idtypeMaterial.nameTypeMaterial == 'Peso'){
            newDetailMQ.extentDetail = payload.weightDetail * newDetailMQ.unitMeasure.multiplication
            newDetailMQ.priceDetail = (newDetailMQ.extentDetail * newDetailMQ.material.priceMaterial)/ newDetailMQ.material.extentMaterial

        } else if (newDetailMQ.unitMeasure.idtypeMaterial.nameTypeMaterial == 'Volumen') {
            newDetailMQ.extentDetail = payload.weightDetail * newDetailMQ.unitMeasure.multiplication;
            newDetailMQ.priceDetail = (newDetailMQ.extentDetail * newDetailMQ.material.priceMaterial)/ newDetailMQ.material.extentMaterial

        }else if (newDetailMQ.unitMeasure.idtypeMaterial.nameTypeMaterial == 'Cantidad'){
            newDetailMQ.priceDetail = (newDetailMQ.quantityDetail * newDetailMQ.material.priceMaterial)/ newDetailMQ.material.quantityMaterial

        }
        return this.detailMaterialQuotationRepo.save(newDetailMQ);
    }

    async update(id: number, payload: UpdateDetailMaterialQuotation) {
        const detailMQ = await this.detailMaterialQuotationRepo.findOne({ where: { idDetail: id } });
        if (detailMQ === null) {
            throw new NotFoundException('Detalle material cotización no se encontro')
        }
        this.detailMaterialQuotationRepo.merge(detailMQ, payload);
        detailMQ.material = await this.materialService.getOne(payload.idMaterial);
        detailMQ.quotation = await this.quotationService.getOne(payload.idQuotation);
        detailMQ.unitMeasure = await this.unitMeasureService.getOne(payload.idUnitMeasure);
        if (detailMQ.unitMeasure.idtypeMaterial.nameTypeMaterial == 'Longitud') {
            console.log('adentro')
            detailMQ.extentDetail = (payload.widthDetail * detailMQ.unitMeasure.multiplication) * (payload.lengthDetail * detailMQ.unitMeasure.multiplication)
            detailMQ.priceDetail = (detailMQ.extentDetail * detailMQ.material.priceMaterial)/ detailMQ.material.extentMaterial

        } else if (detailMQ.unitMeasure.idtypeMaterial.nameTypeMaterial == 'Peso'){
            detailMQ.extentDetail = payload.weightDetail * detailMQ.unitMeasure.multiplication
            detailMQ.priceDetail = (detailMQ.extentDetail * detailMQ.material.priceMaterial)/ detailMQ.material.extentMaterial

        } else if (detailMQ.unitMeasure.idtypeMaterial.nameTypeMaterial == 'Volumen') {
            detailMQ.extentDetail = payload.weightDetail * detailMQ.unitMeasure.multiplication;
            detailMQ.priceDetail = (detailMQ.extentDetail * detailMQ.material.priceMaterial)/ detailMQ.material.extentMaterial

        }else if (detailMQ.unitMeasure.idtypeMaterial.nameTypeMaterial == 'Cantidad'){
            detailMQ.priceDetail = (detailMQ.quantityDetail * detailMQ.material.priceMaterial)/ detailMQ.material.quantityMaterial

        }
        return this.detailMaterialQuotationRepo.save(detailMQ);
    }

    async delete(id: number) {
        return await this.detailMaterialQuotationRepo.softDelete(id);

    }
}
