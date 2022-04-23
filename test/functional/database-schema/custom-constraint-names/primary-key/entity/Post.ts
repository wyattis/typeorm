import { Entity, PrimaryColumn } from "../../../../../../src"

@Entity()
export class Post {
    @PrimaryColumn({ constraintName: "PK_NAME_HEADER" })
    name: string

    @PrimaryColumn({ constraintName: "PK_NAME_HEADER" })
    header: string
}
