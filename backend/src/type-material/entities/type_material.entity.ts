import { MaterialEntity } from "src/material/entities/material.entity";
import { UnitMeasureEntity } from "src/unit-measure/entities/unit_measure.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class TypeMaterialEntity {
    @PrimaryGeneratedColumn()
    idTypeMaterial: number;

    @Column('varchar', {
        comment: 'Nombre del tipo de material'
    })
    nameTypeMaterial: string;

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

    @OneToMany(() => UnitMeasureEntity, (unitMeasure) => unitMeasure.idtypeMaterial,{
        cascade: true,
    })
    unitsMeasures: UnitMeasureEntity[];

    // @OneToMany(() => MaterialEntity, (material)=> material.typeMaterial)
    // materials: MaterialEntity[];

    //idtipomaterial, nombreidtipomaterial

}
