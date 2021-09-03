import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateHotelAndRoomFix1630691904099 implements MigrationInterface {
    name = "CreateHotelAndRoomFix1630691904099"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" DROP COLUMN \"image\"");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" ADD \"image\" character varying NOT NULL");
    }
}
