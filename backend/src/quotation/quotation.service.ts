import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuotation, UpdateQuotation } from './dtos/quotation.dto';
import { QuotationEntity } from './entities/quotation.entity';

@Injectable()
export class QuotationService {
    constructor(
        @InjectRepository(QuotationEntity) private quotationRepo: Repository<QuotationEntity>,
    ) { }

    async getAll() {
        return await this.quotationRepo.find();
    }

    async getOne(id: number) {
        const quotation = await this.quotationRepo.findOne({ where: { idQuotation: id } });
        if (quotation === null) {
            throw new NotFoundException('Registro no encontrado');
        }
        return quotation;
    }

    async create(payload: CreateQuotation) {
        const newQuotation = this.quotationRepo.create(payload);
        newQuotation.percentageProfit = payload.percentageProfit * 0.01;
        return this.quotationRepo.save(newQuotation);
    }

    async update(id: number, payload: UpdateQuotation) {
        const quotation = await this.quotationRepo.findOne({where: {idQuotation:id}});
        if (quotation === null) {
            throw new NotFoundException('Registro no encontrado')
        }
        this.quotationRepo.merge(quotation, payload);
        return this.quotationRepo.save(quotation);
    }

    async delete(id: number) {
        return await this.quotationRepo.softDelete(id);

    }
    
}
