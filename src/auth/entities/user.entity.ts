import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true
    })
    email: string;

    @Column('text', {
        select: false // Esto es para que la contraseña no se muestre en la respuesta de la api
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text',{
        array: true,
        default: ['user'] // Valor por defecto para el campo roles.
    })
    roles: string[];
}
