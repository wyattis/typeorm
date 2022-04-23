import { Entity, PrimaryGeneratedColumn } from "../../../../../../src"

@Entity()
export class User {
    @PrimaryGeneratedColumn({ constraintName: "PK_ID" })
    id: number
}
