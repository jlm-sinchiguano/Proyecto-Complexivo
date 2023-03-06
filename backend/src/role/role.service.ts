import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRole, UpdateRole } from './dtos/role.dto';
import { RoleEntity } from './entities/rol.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>,
    ) { }

    async getAll() {
        return await this.roleRepo.find();
    }

    async getOne(id: number) {
        const role = await this.roleRepo.findOne({ where: { idRole: id } });
        if (role === null) {
            throw new NotFoundException('Registro no encontrado');
        }
        return role;
    }

    async create(payload: CreateRole) {
        const newRole = await this.roleRepo.create(payload);
        return this.roleRepo.save(newRole);
    }

    async update(id: number, payload: UpdateRole) {
        const role = await this.roleRepo.findOne({where: {idRole:id}});
        if (role === null) {
            throw new NotFoundException('Registro no encontrado')
        }
        this.roleRepo.merge(role, payload);
        return this.roleRepo.save(role);
    }

    async delete(id: number) {
        return await this.roleRepo.softDelete(id);

    }
}
