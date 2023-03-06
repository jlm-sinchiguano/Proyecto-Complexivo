import { IsNotEmpty } from "class-validator";
import { HandWorkEntity } from "src/hand-work/entities/hand_work.entity";
import { MaterialEntity } from "src/material/entities/material.entity";
import { QuotationEntity } from "src/quotation/entities/quotation.entity";
import { UnitMeasureEntity } from "src/unit-measure/entities/unit_measure.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class DetailMaterialQuotationEntity {
	@PrimaryGeneratedColumn()
	idDetail: number;

	@Column( {
		type: 'float',
		comment: 'Ancho del material utilizado',
		nullable: true,
	})
	widthDetail: number;

	@Column( {
		type: 'float',
		comment: 'Largo del material utilizado',
		nullable: true,
	})
	lengthDetail: number;

	@Column( {
		type: 'float',
		comment: 'Peso del material utilizado',
		nullable: true,
	})
	weightDetail: number;

	@Column('int', {
		comment: 'Cantidad de material utilizado',
		nullable: true,
	})
	quantityDetail: number;

	@Column( {
		type: 'float',
		comment: 'Medida total del material utilizado',
		nullable: true,
	})
	extentDetail: number;

	@Column('double precision', {
		comment: 'Precio del material utilizado',
	})
	priceDetail: number;
	
	@Column('varchar', {
        comment: 'Nombre tipo de material'
    })
    typeMaterial: string;

	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@UpdateDateColumn({
		name: 'updated_at',
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
	})
	updatedAt: Date;

	@DeleteDateColumn({
		name: 'deleted_at',
		type: 'timestamptz',
		nullable: true,
	})
	deletedAt: Date;

	@ManyToOne(() => MaterialEntity, (material) => material.detailsMaterials)
	@JoinColumn({ name: 'idMaterial' })
	material: MaterialEntity;

	@ManyToOne(() => QuotationEntity, (quotation) => quotation.detailsMaterials, {eager: true})
	@JoinColumn({ name: 'idQuotation' })
	quotation: QuotationEntity;

	@ManyToOne(() => UnitMeasureEntity, (unitM) => unitM.detailMQ)
    @JoinColumn({ name: 'idUnitMeasure' })
    unitMeasure: UnitMeasureEntity;

	//iddetalle,anchodetalle,largodetalle,pesodetalle,cantidaddetalle,medidadetalle,
	//preciodetalle,tiempodetalle,preciotiempo,idmaterial,idcotizacion,idmanoobra
}
