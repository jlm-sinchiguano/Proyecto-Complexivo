import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotationEntity } from './entities/quotation.entity';
import { QuotationController } from './quotation.controller';
import { QuotationService } from './quotation.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuotationEntity])],
  controllers: [QuotationController],
  providers: [QuotationService],
  exports: [TypeOrmModule, QuotationService],
})
export class QuotationModule {}
