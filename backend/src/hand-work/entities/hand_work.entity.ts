import { DetailHandWorkQuotationEntity } from "src/detail-hand-work-quotation/entities/detail-hand-work-quotation.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class HandWorkEntity {
	@PrimaryGeneratedColumn()
	idHandWork: number;

	@Column('varchar', {
		comment: 'Nombre del tipo de mano de obra',
		unique:true,
	})
	nameHandWork: string;

	@Column('varchar', {
		comment: 'Una pequeña descripcion de tipo de mano de obra',
		nullable: true
	})
	descriptionHandWork: string;

	@Column( {
		type: 'float',
		comment: 'Sueldo que la persona gana al mes'
	})
	salary: number;

	@Column('int', {
		comment: 'Cantidad de horas que trabajara al mes'
	})
	hoursMonth: number;

	@Column('double precision', {
		comment: 'Precio que tendra la hora de trabajo'
	})
	priceHour: number;

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

	@OneToMany(() => DetailHandWorkQuotationEntity, (detailHQ)=> detailHQ.handWork,{
		cascade: true,
	})
	detailsHands: DetailHandWorkQuotationEntity[];

	//idManoObra, nombreManoObra, DescripcionManoObra, Sueldo, HorasMes, PrecioHora
}
