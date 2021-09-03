import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateHotelAndRoomFix21630692947444 implements MigrationInterface {
    name = "CreateHotelAndRoomFix21630692947444"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" RENAME COLUMN \"occupiedQuantity\" TO \"available\"");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" RENAME COLUMN \"available\" TO \"occupiedQuantity\"");
    }
}
