import { DetailHandWorkQuotationEntity } from "src/detail-hand-work-quotation/entities/detail-hand-work-quotation.entity";
import { DetailMaterialQuotationEntity } from "src/detail_material_quotation copy/entities/detail_material_quotation.entity";
import { MaterialEntity } from "src/material/entities/material.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class QuotationEntity {
	@PrimaryGeneratedColumn()
	idQuotation: number;

	@Column('varchar', {
		comment: 'Nombre de la cotización',
		unique: true,
	})
	nameQuotation: string;

	@Column('varchar', {
		comment: 'Una pequeña descripcion de la cotización',
		nullable: true
	})
	descriptionQuotation: string;

	@Column( {
		type: 'float',
		comment: 'Porcentaje de ganancia'
	})
	percentageProfit: number;

	@Column('double precision', {
		comment: 'Precio final del producto',
		nullable: true,
	})
	salePrice: number;

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

	@OneToMany(() => DetailMaterialQuotationEntity, (detail) => detail.quotation,{
		cascade: true,
	})
	detailsMaterials: DetailMaterialQuotationEntity[];

	@OneToMany(() => DetailHandWorkQuotationEntity, (detail) => detail.quotation,{
		cascade: true,
	})
	detailsHands: DetailHandWorkQuotationEntity[];

	//idcotizacion, nombrecotizacion, descripcioncotizacion, porcentaecotizacion, precioventacotizacon,

}
