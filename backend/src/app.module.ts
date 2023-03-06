import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotationModule } from './quotation/quotation.module';
import { HandWorkModule } from './hand-work/hand-work.module';
import { RoleModule } from './role/role.module';
import { TypeMaterialModule } from './type-material/type-material.module';
import { UnitMeasureModule } from './unit-measure/unit-measure.module';
import { UserModule } from './user/user.module';
import { MaterialModule } from './material/material.module';
import { DetailMaterialQuotationModule } from './detail_material_quotation copy/detail_material_quotation.module';
import { DetailHandWorkQuotationModule } from './detail-hand-work-quotation/detail-hand-work-quotation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5433,
      username: "postgres",
      password: "jenny2668263",
      database: "CreacionesSundayBD",
      logging: true,
      synchronize: true,
      autoLoadEntities: true,
    }),
    QuotationModule,
    DetailMaterialQuotationModule,
    HandWorkModule,
    RoleModule,
    TypeMaterialModule,
    UnitMeasureModule,
    UserModule,
    MaterialModule,
    DetailHandWorkQuotationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
