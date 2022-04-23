import { Entity, PrimaryColumn } from "../../../../../../src"

@Entity()
export class Post {
    @PrimaryColumn({ primaryKeyConstraintName: "PK_NAME_HEADER" })
    name: string

    @PrimaryColumn({ primaryKeyConstraintName: "PK_NAME_HEADER" })
    header: string
}
