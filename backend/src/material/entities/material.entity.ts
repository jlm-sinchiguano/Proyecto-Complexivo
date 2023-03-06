
import { DetailMaterialQuotationEntity } from "src/detail_material_quotation copy/entities/detail_material_quotation.entity";
import { UnitMeasureEntity } from "src/unit-measure/entities/unit_measure.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import { ColumnNumericTransformer } from "../material.controller";

@Entity()
export class MaterialEntity {
    @PrimaryGeneratedColumn()
    idMaterial: number;

    @Column('varchar', {
        comment: 'Nombre del material ingresado',
        unique: true,
    })
    nameMaterial: string;

    @Column({
        type: 'float',
        comment: 'Ancho del material',
        nullable: true,
    })
    widthMaterial: number;

    @Column({
        type: 'float',
        comment: 'Largo del material',
        nullable: true,
    })
    lengthMaterial: number;

    @Column({
        type: 'float',
        comment: 'Peso del material ',
        nullable: true,
    })
    weightMaterial: number;

    @Column('int', {
        comment: 'Cantidad de material',
        nullable: true,
    })
    quantityMaterial: number;

    @Column( {
        type: 'float',
        comment: 'Medida total del material',
        nullable: true,
    })
    extentMaterial: number;

    @Column('double precision', {
        comment: 'Precio del material'
    })
    priceMaterial: number;

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

    // @ManyToOne(() => UserEntity, (user) => user.materials)
    // @JoinColumn({ name: 'idUser' })
    // user: UserEntity;

    @ManyToOne(() => UnitMeasureEntity, (unitM) => unitM.materials)
    @JoinColumn({ name: 'idUnitMeasure' })
    unitMeasure: UnitMeasureEntity;

    @OneToMany(() => DetailMaterialQuotationEntity, (detail) => detail.material, {
        cascade: true,
    })
    detailsMaterials: DetailMaterialQuotationEntity[];

    //idMaterial, nombreMaterial, largomaterial,anchomaterial, persomaterial,cantidadmeaterial
    //medidamaterial, preciomaterial
    //fk_idUsuario uno a muchos
    //fk_tipomaterial uno a muchos

    

}
