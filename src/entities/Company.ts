import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class Company {

    @PrimaryColumn()
    cnpj: string

    @Column()
    corporateName: string

    @Column()
    address: string

    @Column()
    field: string

    @Column()
    phone: string

    @Column()
    hrContactName: string

    @Column()
    hrContactEmail: string

    @Column()
    hrContactPhone: string

}
