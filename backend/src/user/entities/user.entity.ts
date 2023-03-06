import { MaterialEntity } from "src/material/entities/material.entity";
import { RoleEntity } from "src/role/entities/rol.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    idUser: number;

    @Column('varchar', {
        comment: 'Nombre del usuario'
    })
    nameUser: string;

    @Column('varchar', {
        comment: 'Contraseña del usuario'
    })
    passwordUser: string;

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

    @ManyToOne(() => RoleEntity, (role) => role.users)
    @JoinColumn({ name: 'idRol' })
    rol: RoleEntity;

    // @OneToMany(() => MaterialEntity, (material) => material.user)
    // materials: MaterialEntity[];

    //isusuario, nombreusuario, contraseñausuario, 
    //fk_rol uno a muchos


}
