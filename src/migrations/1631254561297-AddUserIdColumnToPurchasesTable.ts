import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdColumnToPurchasesTable1631254561297 implements MigrationInterface {
  name = "AddUserIdColumnToPurchasesTable1631254561297";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "purchases" ADD "userId" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "FK_341f0dbe584866284359f30f3da" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_341f0dbe584866284359f30f3da"`);
    await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "userId"`);
  }
}
