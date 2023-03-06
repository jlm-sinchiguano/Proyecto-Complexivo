import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HandWorkService } from 'src/hand-work/hand-work.service';
import { QuotationService } from 'src/quotation/quotation.service';
import { Repository } from 'typeorm';
import { CreateDetailHandWorkQuotation, UpdateDetailHandWorkQuotation } from './dtos/detail-hand-work-quotation.dto';
import { DetailHandWorkQuotationEntity } from './entities/detail-hand-work-quotation.entity';

@Injectable()
export class DetailHandWorkQuotationService {
    constructor(
        @InjectRepository(DetailHandWorkQuotationEntity)
        private detailHandWorkQuotationRepo: Repository<DetailHandWorkQuotationEntity>,
        private quotationService: QuotationService,
        private handWorkService: HandWorkService,
    ) { }

    async getAll() {
        return await this.detailHandWorkQuotationRepo.find({
            relations:['quotation', 'handWork']
        });
    }

    async findAll(id: number) {
        const priceHa  = await  this.detailHandWorkQuotationRepo.find({
            relations:['quotation', 'handWork'],
            where: {quotation: { idQuotation: id}}
        })
        return priceHa
    }

    async getOne(id: number) {
        const detailHQ = await this.detailHandWorkQuotationRepo.findOne({ where: { idDetailHand: id } });
        if (detailHQ === null) {
            throw new NotFoundException('Detalle mano de obra, cotización no encontrado');
        }
        return detailHQ;
    }

    async create(payload: CreateDetailHandWorkQuotation) {
        const newDetailHQ = this.detailHandWorkQuotationRepo.create(payload);
        newDetailHQ.quotation = await this.quotationService.getOne(payload.idQuotation);
        newDetailHQ.handWork = await this.handWorkService.getOne(payload.idHandWork);
        newDetailHQ.priceTime = (((payload.hours * 60) + payload.minutes) * newDetailHQ.handWork.priceHour) / 60
        return this.detailHandWorkQuotationRepo.save(newDetailHQ);
    }

    async update(id: number, payload: UpdateDetailHandWorkQuotation) {
        const detailHQ = await this.detailHandWorkQuotationRepo.findOne({ where: { idDetailHand: id } });
        if (detailHQ === null) {
            throw new NotFoundException('Detalle mano de obra, cotización no se encontro')
        }
        this.detailHandWorkQuotationRepo.merge(detailHQ, payload);
        detailHQ.quotation = await this.quotationService.getOne(payload.idQuotation);
        detailHQ.handWork = await this.handWorkService.getOne(payload.idHandWork);
        detailHQ.priceTime = (((payload.hours * 60) + payload.minutes) * detailHQ.handWork.priceHour) / 60
        return this.detailHandWorkQuotationRepo.save(detailHQ);
    }

    async delete(id: number) {
        return await this.detailHandWorkQuotationRepo.softDelete(id);

    }
}
