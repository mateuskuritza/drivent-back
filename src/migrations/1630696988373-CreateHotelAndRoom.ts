import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateHotelAndRoom1630696988373 implements MigrationInterface {
    name = "CreateHotelAndRoom1630696988373"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"hotels\" ALTER COLUMN \"vacancies\" DROP NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"hotels\" ALTER COLUMN \"vacancies\" SET NOT NULL");
    }
}
