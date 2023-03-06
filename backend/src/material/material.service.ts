import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnitMeasureService } from 'src/unit-measure/unit-measure.service';
import { Repository } from 'typeorm';
import { CreateMaterial, UpdateMaterial } from './dtos/material.dto';
import { MaterialEntity } from './entities/material.entity';

@Injectable()
export class MaterialService {

    constructor(
        @InjectRepository(MaterialEntity)
        private materialRepo: Repository<MaterialEntity>,
        private unitMeasureService: UnitMeasureService,
    ) { }

    async getAll() {
        return await this.materialRepo.find({
            relations: ['unitMeasure']
        });
    }

    async getOne(id: number) {
        const material = await this.materialRepo.findOne({ where: { idMaterial: id } });
        if (material === null) {
            throw new NotFoundException('Registro no encontrado');
        }
        return material;
    }

    async create(payload: CreateMaterial) {
        const newMaterial = this.materialRepo.create(payload);
        newMaterial.unitMeasure = await this.unitMeasureService.getOne(payload.idUnitMeasure);
        if (newMaterial.unitMeasure.idtypeMaterial.nameTypeMaterial == 'Longitud') {
            console.log('adentro')
            newMaterial.extentMaterial = (payload.widthMaterial * newMaterial.unitMeasure.multiplication) * (payload.lengthMaterial * newMaterial.unitMeasure.multiplication)

        } else if (newMaterial.unitMeasure.idtypeMaterial.nameTypeMaterial == 'Peso') {
            newMaterial.extentMaterial = payload.weightMaterial * newMaterial.unitMeasure.multiplication

        } else if (newMaterial.unitMeasure.idtypeMaterial.nameTypeMaterial == 'Volumen') {
            newMaterial.extentMaterial = payload.weightMaterial * newMaterial.unitMeasure.multiplication
        }
        return this.materialRepo.save(newMaterial);
    }

    async update(id: number, payload: UpdateMaterial) {
        const material = await this.materialRepo.findOne({ where: { idMaterial: id } });
        if (material === null) {
            throw new NotFoundException('Registro no encontrado')
        }
        this.materialRepo.merge(material, payload);
        material.unitMeasure = await this.unitMeasureService.getOne(payload.idUnitMeasure);
        if (material.unitMeasure.idtypeMaterial.nameTypeMaterial == 'Longitud') {
            console.log('adentro')
            material.extentMaterial = (payload.widthMaterial * material.unitMeasure.multiplication) * (payload.lengthMaterial * material.unitMeasure.multiplication)

        } else if (material.unitMeasure.idtypeMaterial.nameTypeMaterial == 'Peso') {
            material.extentMaterial = payload.weightMaterial * material.unitMeasure.multiplication

        } else if (material.unitMeasure.idtypeMaterial.nameTypeMaterial == 'Volumen') {
            material.extentMaterial = payload.weightMaterial * material.unitMeasure.multiplication
        }
        return this.materialRepo.save(material);
    }

    async delete(id: number) {
        return await this.materialRepo.softDelete(id);

    }
}
