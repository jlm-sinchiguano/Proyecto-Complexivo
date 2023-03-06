import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';
import { Repository } from 'typeorm';
import { CreateUser, UpdateUser } from './dtos/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) 
        private userRepo: Repository<UserEntity>,
        private rolService:RoleService,
    ) { }

    async getAll() {
        return await this.userRepo.find({
            relations:['rol']
        });
    }

    async getOne(id: number) {
        const user = await this.userRepo.findOne({ where: { idUser: id } });
        if (user === null) {
            throw new NotFoundException('Registro no encontrado');
        }
        return user;
    }

    async create(payload: CreateUser) {
        const newUser = await this.userRepo.create(payload);
        newUser.rol = await this.rolService.getOne(payload.idRol);
        return this.userRepo.save(newUser);
    }

    async update(id: number, payload: UpdateUser) {
        const user = await this.userRepo.findOne({where: {idUser:id}});
        if (user === null) {
            throw new NotFoundException('Registro no encontrado')
        }
        this.userRepo.merge(user, payload);
        user.rol = await this.rolService.getOne(payload.idRol);
        return this.userRepo.save(user);
    }

    async delete(id: number) {
        return await this.userRepo.softDelete(id);

    }
}
