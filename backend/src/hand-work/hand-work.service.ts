import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHandWork, UpdateHandWork } from './dtos/hand_work.dto';
import { HandWorkEntity } from './entities/hand_work.entity';

@Injectable()
export class HandWorkService {
    constructor(
        @InjectRepository(HandWorkEntity) private handWorkRepo: Repository<HandWorkEntity>,
    ) { }

    async getAll() {
        return await this.handWorkRepo.find();
    }

    async getOne(id: number) {
        const handW = await this.handWorkRepo.findOne({ where: { idHandWork: id } });
        if (handW === null) {
            throw new NotFoundException('Registro no encontrado');
        }
        return handW;
    }

    async create(payload: CreateHandWork) {
        const newHandW = this.handWorkRepo.create(payload);
        newHandW.priceHour = payload.salary / payload.hoursMonth
        return this.handWorkRepo.save(newHandW);
    }

    async update(id: number, payload: UpdateHandWork) {
        const handW = await this.handWorkRepo.findOne({ where: { idHandWork: id } });
        if (handW === null) {
            throw new NotFoundException('Registro no encontrado')
        }
        handW.priceHour = payload.salary / payload.hoursMonth
        this.handWorkRepo.merge(handW, payload);
        return this.handWorkRepo.save(handW);
    }

    async delete(id: number) {
        return await this.handWorkRepo.softDelete(id);

    }
}
