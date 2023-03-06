import { IsNotEmpty } from "class-validator";
import { HandWorkEntity } from "src/hand-work/entities/hand_work.entity";
import { QuotationEntity } from "src/quotation/entities/quotation.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class DetailHandWorkQuotationEntity {
	@PrimaryGeneratedColumn()
	idDetailHand: number;

	@Column('int', {
		comment:'Horas de elaboración',
		default: 0,
		nullable: true,
	})
	hours: number;

	@Column('int', {
		comment:'Miutos de elaboración',
		default:0,
		nullable: true,
	})
	minutes:number;

	@Column('double precision', {
		comment: 'Precio por tiempo de elaboración',
		nullable: true,
	})
	priceTime: number;

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

	@ManyToOne(() => HandWorkEntity, (handWork) => handWork.detailsHands)
	@JoinColumn({ name: 'idHandWork' })
	handWork: HandWorkEntity;

	@ManyToOne(() => QuotationEntity, (quotation) => quotation.detailsHands,  {eager: true})
	@JoinColumn({ name: 'idQuotation' })
	quotation: QuotationEntity;
}
