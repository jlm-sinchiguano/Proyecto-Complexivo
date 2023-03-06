import { DetailMaterialQuotationEntity } from "src/detail_material_quotation copy/entities/detail_material_quotation.entity";
import { MaterialEntity } from "src/material/entities/material.entity";
import { TypeMaterialEntity } from "src/type-material/entities/type_material.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class UnitMeasureEntity {
    @PrimaryGeneratedColumn()
    idUnitMeasure: number;

    @Column('varchar', {
        comment: 'Nombre de la unidad de medida',
        unique: true,
    })
    nameUnitMeasure: string;

    @Column('varchar', {
        comment: 'Abreviación de la unidad de medida'
    })
    abbreviation: string;

    @Column( {
        type: 'float',
        comment: 'Valor por el que se multiplicara'
    })
    multiplication: number;


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

    @ManyToOne(() => TypeMaterialEntity, (typeMaterial) => typeMaterial.unitsMeasures,{eager: true})
    @JoinColumn({ name: 'idtypeMaterial' })
    idtypeMaterial: TypeMaterialEntity;

    @OneToMany(() => MaterialEntity, (material)=> material.unitMeasure,{
        cascade: true,
    })
    materials: MaterialEntity[];

    @OneToMany(() => DetailMaterialQuotationEntity, (detailMQ)=> detailMQ.unitMeasure,{
        cascade: true,
    })
    detailMQ: DetailMaterialQuotationEntity[];

    //idunidad, nombreunidad, abreviatura, multiplicacion
    //fk_tipomaterial uno a muchos

}
