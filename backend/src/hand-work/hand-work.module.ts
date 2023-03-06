import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandWorkEntity } from './entities/hand_work.entity';
import { HandWorkController } from './hand-work.controller';
import { HandWorkService } from './hand-work.service';

@Module({
  imports: [TypeOrmModule.forFeature([HandWorkEntity])],
  controllers: [HandWorkController],
  providers: [HandWorkService],
  exports: [TypeOrmModule, HandWorkService],
})
export class HandWorkModule {}
