import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeMaterialModule } from 'src/type-material/type-material.module';
import { UnitMeasureModule } from 'src/unit-measure/unit-measure.module';
import { MaterialEntity } from './entities/material.entity';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialEntity]), UnitMeasureModule],
  controllers: [MaterialController],
  providers: [MaterialService],
  exports: [TypeOrmModule, MaterialService],
})
export class MaterialModule {}
