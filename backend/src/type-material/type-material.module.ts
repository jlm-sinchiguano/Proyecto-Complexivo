import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeMaterialEntity } from './entities/type_material.entity';
import { TypeMaterialController } from './type-material.controller';
import { TypeMaterialService } from './type-material.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypeMaterialEntity])],
  controllers: [TypeMaterialController],
  providers: [TypeMaterialService],
  exports: [TypeOrmModule, TypeMaterialService],
})
export class TypeMaterialModule {}
