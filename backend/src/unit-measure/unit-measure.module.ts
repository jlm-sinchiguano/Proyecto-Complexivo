import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeMaterialModule } from 'src/type-material/type-material.module';
import { UnitMeasureEntity } from './entities/unit_measure.entity';
import { UnitController, UnitMeasureController } from './unit-measure.controller';
import { UnitMeasureService } from './unit-measure.service';

@Module({
  imports: [TypeOrmModule.forFeature([UnitMeasureEntity]), TypeMaterialModule],
  controllers: [UnitMeasureController, UnitController],
  providers: [UnitMeasureService],
  exports: [TypeOrmModule, UnitMeasureService],
})
export class UnitMeasureModule {}
