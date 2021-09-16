import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordRecoveryTokenTable1631752439433 implements MigrationInterface {
  name = "AddPasswordRecoveryTokenTable1631752439433";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "passwordRecoveryTokens" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "email" character varying NOT NULL, "usedAt" bigint NOT NULL, CONSTRAINT "UQ_6ac61601d5943c8080424deacc2" UNIQUE ("value"), CONSTRAINT "PK_a0b94d0545ed4037952aaa54cf0" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "passwordRecoveryTokens"`);
  }
}
