import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePhotoTable1631583365159 implements MigrationInterface {
  name = "CreatePhotoTable1631583365159";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "photos" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "size" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying, "key" character varying, "userId" integer NOT NULL, CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "photoId" integer`);
    await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_f856a4818b32c69dbc8811f3d2c" UNIQUE ("photoId")`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_f856a4818b32c69dbc8811f3d2c" FOREIGN KEY ("photoId") REFERENCES "photos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f856a4818b32c69dbc8811f3d2c"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_f856a4818b32c69dbc8811f3d2c"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "photoId"`);
    await queryRunner.query(`DROP TABLE "photos"`);
  }
}
