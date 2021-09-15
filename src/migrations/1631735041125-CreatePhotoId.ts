import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePhotoId1631735041125 implements MigrationInterface {
    name = 'CreatePhotoId1631735041125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" ALTER COLUMN "userId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" ALTER COLUMN "userId" SET NOT NULL`);
    }

}
