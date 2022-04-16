import "reflect-metadata"
import { expect } from "chai"
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../../../utils/test-utils"
import { DataSource } from "../../../../../src"
import { Animal } from "./entity/Animal"

describe("database schema > custom constraint names > foreign key", () => {
    let dataSources: DataSource[]

    before(
        async () =>
            (dataSources = await createTestingConnections({
                entities: [__dirname + "/entity/*{.js,.ts}"],
            })),
    )
    beforeEach(() => reloadTestingDatabases(dataSources))
    after(() => closeTestingConnections(dataSources))

    it("should set custom constraint names", () =>
        Promise.all(
            dataSources.map(async (dataSource) => {
                let metadata = dataSource.getMetadata(Animal)

                // check ManyToMany constraints
                const joinTable = metadata.ownRelations[0]
                const mtmFk1 = joinTable.foreignKeys.find(
                    (fk) => fk.name === "fk_animal_category_categoryId",
                )
                const mtmFk2 = joinTable.foreignKeys.find(
                    (fk) => fk.name === "fk_animal_category_animalId",
                )

                expect(mtmFk1).to.exist
                expect(mtmFk2).to.exist

                // check ManyToOne constraint
                const mtoFk = metadata.foreignKeys.find(
                    (fk) => fk.name === "fk_animal_breedId",
                )
                expect(mtoFk).to.exist

                // check OneToOne constraint
                const otoFk = metadata.foreignKeys.find(
                    (fk) => fk.name === "fk_animal_nameId",
                )
                expect(otoFk).to.exist
            }),
        ))

    it.only("should load constraints with custom names", () =>
        Promise.all(
            dataSources.map(async (dataSource) => {
                const queryRunner = dataSource.createQueryRunner()
                const table = await queryRunner.getTable("animal")
                const joinTable = await queryRunner.getTable("animal_category")
                await queryRunner.release()

                // check ManyToMany constraints
                const mtmFk1 = joinTable!.foreignKeys.find(
                    (fk) => fk.name === "fk_animal_category_categoryId",
                )
                const mtmFk2 = joinTable!.foreignKeys.find(
                    (fk) => fk.name === "fk_animal_category_animalId",
                )

                expect(mtmFk1).to.exist
                expect(mtmFk2).to.exist

                // check ManyToOne constraint
                const mtoFk = table!.foreignKeys.find(
                    (fk) => fk.name === "fk_animal_breedId",
                )
                expect(mtoFk).to.exist

                // check OneToOne constraint
                const otoFk = table!.foreignKeys.find(
                    (fk) => fk.name === "fk_animal_nameId",
                )
                expect(otoFk).to.exist
            }),
        ))
})
