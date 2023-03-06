import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandWorkModule } from 'src/hand-work/hand-work.module';
import { QuotationModule } from 'src/quotation/quotation.module';
import { DetailHandWorkQuotationController, DetailHQController } from './detail-hand-work-quotation.controller';
import { DetailHandWorkQuotationService } from './detail-hand-work-quotation.service';
import { DetailHandWorkQuotationEntity } from './entities/detail-hand-work-quotation.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DetailHandWorkQuotationEntity]), QuotationModule, HandWorkModule],
    controllers: [DetailHandWorkQuotationController, DetailHQController],
    providers: [DetailHandWorkQuotationService],
    exports: [TypeOrmModule, DetailHandWorkQuotationService],
})
export class DetailHandWorkQuotationModule {}
