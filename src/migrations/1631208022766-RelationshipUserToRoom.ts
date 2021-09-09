import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationshipUserToRoom1631208022766 implements MigrationInterface {
    name = "RelationshipUserToRoom1631208022766"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" ADD \"userId\" integer");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"UQ_79d909def044937cd35642b0d11\" UNIQUE (\"userId\")");
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("ALTER TABLE \"rooms\" ALTER COLUMN \"hotelId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_79d909def044937cd35642b0d11\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_79d909def044937cd35642b0d11\"");
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("ALTER TABLE \"rooms\" ALTER COLUMN \"hotelId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"UQ_79d909def044937cd35642b0d11\"");
      await queryRunner.query("ALTER TABLE \"rooms\" DROP COLUMN \"userId\"");
    }
}
