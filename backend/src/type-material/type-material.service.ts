import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeMaterial, UpdateTypeMaterial } from './dtos/type_material.dto';
import { TypeMaterialEntity } from './entities/type_material.entity';

@Injectable()
export class TypeMaterialService {
    constructor(
        @InjectRepository(TypeMaterialEntity) private typeMaterialRepo: Repository<TypeMaterialEntity>,
    ) { }

    async getAll() {
        return await this.typeMaterialRepo.find();
    }

    async getOne(id: number) {
        const typeM = await this.typeMaterialRepo.findOne({ where: { idTypeMaterial: id } });
        if (typeM === null) {
            throw new NotFoundException('Registro no encontrado');
        }
        return typeM;
    }

    async create(payload: CreateTypeMaterial) {
        const newTypeM = await this.typeMaterialRepo.create(payload);
        return this.typeMaterialRepo.save(newTypeM);
    }

    async update(id: number, payload: UpdateTypeMaterial) {
        const typeM = await this.typeMaterialRepo.findOne({where: {idTypeMaterial:id}});
        if (typeM === null) {
            throw new NotFoundException('Registro no encontrado')
        }
        this.typeMaterialRepo.merge(typeM, payload);
        return this.typeMaterialRepo.save(typeM);
    }

    async delete(id: number) {
        return await this.typeMaterialRepo.softDelete(id);

    }
}
