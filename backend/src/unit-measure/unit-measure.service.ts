import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeMaterialService } from 'src/type-material/type-material.service';
import { Repository } from 'typeorm';
import { CreateUnitMeasure, UpdateUnitMeasure } from './dtos/unit_measure.dto';
import { UnitMeasureEntity } from './entities/unit_measure.entity';

@Injectable()
export class UnitMeasureService {
    constructor(
        @InjectRepository(UnitMeasureEntity)
        private unitMeasureRepo: Repository<UnitMeasureEntity>,
        private typeMaterialService: TypeMaterialService,
    ) { }

    async getAll() {
        return await this.unitMeasureRepo.find({
            relations: ['idtypeMaterial']
        });
    }

    async findAll(id: number) {
        const uniType = await this.unitMeasureRepo
            .createQueryBuilder("unit_measure_entity")
            .where('unit_measure_entity.idtypeMaterial = :idtypeMaterial', { idtypeMaterial: id })
            .getMany()
        return uniType
    }

    async getOne(id: number) {
        const unitM = await this.unitMeasureRepo.findOne({ where: { idUnitMeasure: id } });
        if (unitM === null) {
            throw new NotFoundException('Registro no encontrado');
        }
        return unitM;
    }

    async create(payload: CreateUnitMeasure) {
        const newUnitM = this.unitMeasureRepo.create(payload);
        newUnitM.idtypeMaterial = await this.typeMaterialService.getOne(payload.typeMaterial);
        return this.unitMeasureRepo.save(newUnitM);
    }

    async update(id: number, payload: UpdateUnitMeasure) {
        const unitM = await this.unitMeasureRepo.findOne({ where: { idUnitMeasure: id } });
        if (unitM === null) {
            throw new NotFoundException('Registro no encontrado')
        }
        this.unitMeasureRepo.merge(unitM, payload);
        unitM.idtypeMaterial = await this.typeMaterialService.getOne(payload.typeMaterial);
        return this.unitMeasureRepo.save(unitM);
    }

    async delete(id: number) {
        return await this.unitMeasureRepo.softDelete(id);

    }
}
