import { MigrationInterface, QueryRunner } from "typeorm";

export class PasswordRecoveryToken1631734625439 implements MigrationInterface {
  name = "PasswordRecoveryToken1631734625439";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "PasswordRecoveryTokens" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "email" character varying NOT NULL, "usedAt" integer NOT NULL, CONSTRAINT "UQ_9ab1bfff97b24d2bb0e8ad66bb3" UNIQUE ("value"), CONSTRAINT "PK_466adf9a25238fc64147c5cf17a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "PasswordRecoveryTokens"`);
  }
}
