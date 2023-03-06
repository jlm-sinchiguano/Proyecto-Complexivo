import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandWorkModule } from 'src/hand-work/hand-work.module';
import { MaterialModule } from 'src/material/material.module';
import { QuotationModule } from 'src/quotation/quotation.module';
import { UnitMeasureModule } from 'src/unit-measure/unit-measure.module';
import { DetailMaterialQuotationController, DetailMQController } from './detail_material_quotation.controller';
import { DetailMaterialQuotationService } from './detail_material_quotation.service';
import { DetailMaterialQuotationEntity } from './entities/detail_material_quotation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetailMaterialQuotationEntity]), MaterialModule, QuotationModule, UnitMeasureModule],
  controllers: [DetailMaterialQuotationController, DetailMQController],
  providers: [DetailMaterialQuotationService],
  exports: [TypeOrmModule, DetailMaterialQuotationService],
})
export class DetailMaterialQuotationModule {}
