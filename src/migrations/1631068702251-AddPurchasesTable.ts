import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPurchasesTable1631068702251 implements MigrationInterface {
  name = "AddPurchasesTable1631068702251";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "modalities" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "totalVacancy" integer NOT NULL, "availableVacancy" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "UQ_e6de06e62c9e55b41a875f9d4fa" UNIQUE ("name"), CONSTRAINT "PK_4135bf3c2e5bb971c20b08bbef1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "purchases" ("id" SERIAL NOT NULL, "enrollmentId" integer NOT NULL, "modalityId" integer NOT NULL, "accommodationId" integer NOT NULL, "totalPrice" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "paymentDone" boolean NOT NULL DEFAULT FALSE, CONSTRAINT "REL_8fbb68c0d4c3c4c8fedb286c79" UNIQUE ("enrollmentId"), CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "accommodations" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "UQ_a534ee8eecda81beead042260cd" UNIQUE ("name"), CONSTRAINT "PK_a422a200297f93cd5ac87d049e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollments" ADD CONSTRAINT "UQ_de33d443c8ae36800c37c58c929" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollments" ADD CONSTRAINT "FK_de33d443c8ae36800c37c58c929" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "FK_8fbb68c0d4c3c4c8fedb286c791" FOREIGN KEY ("enrollmentId") REFERENCES "enrollments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "FK_3beaa6f7528e9bffff291dac30a" FOREIGN KEY ("modalityId") REFERENCES "modalities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "FK_e5da8f98cb11a226d03a09fae5a" FOREIGN KEY ("accommodationId") REFERENCES "accommodations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_e5da8f98cb11a226d03a09fae5a"`);
    await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_3beaa6f7528e9bffff291dac30a"`);
    await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_8fbb68c0d4c3c4c8fedb286c791"`);
    await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "FK_de33d443c8ae36800c37c58c929"`);
    await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "UQ_de33d443c8ae36800c37c58c929"`);
    await queryRunner.query(`DROP TABLE "accommodations"`);
    await queryRunner.query(`DROP TABLE "purchases"`);
    await queryRunner.query(`DROP TABLE "modalities"`);
  }
}
