import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPurchasesTable1631200212255 implements MigrationInterface {
  name = "AddPurchasesTable1631200212255";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "modalities" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "totalVacancy" integer, "availableVacancy" integer, "price" integer NOT NULL, CONSTRAINT "UQ_e6de06e62c9e55b41a875f9d4fa" UNIQUE ("name"), CONSTRAINT "PK_4135bf3c2e5bb971c20b08bbef1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "purchases" ("id" SERIAL NOT NULL, "enrollmentId" integer NOT NULL, "modalityId" integer NOT NULL, "accommodationId" integer NOT NULL, "totalPrice" integer, "paymentDone" boolean NOT NULL DEFAULT FALSE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_8fbb68c0d4c3c4c8fedb286c79" UNIQUE ("enrollmentId"), CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "accommodations" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "UQ_a534ee8eecda81beead042260cd" UNIQUE ("name"), CONSTRAINT "PK_a422a200297f93cd5ac87d049e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rooms" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "size" integer NOT NULL, "available" integer NOT NULL, "hotelId" integer, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hotels" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, "size" integer NOT NULL, "vacancies" integer, CONSTRAINT "PK_2bb06797684115a1ba7c705fc7b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "enrollments" ADD "purchaseId" integer`);
    await queryRunner.query(
      `ALTER TABLE "enrollments" ADD CONSTRAINT "UQ_de33d443c8ae36800c37c58c929" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrollments" ADD CONSTRAINT "FK_de33d443c8ae36800c37c58c929" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "FK_e5da8f98cb11a226d03a09fae5a" FOREIGN KEY ("accommodationId") REFERENCES "accommodations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "FK_8fbb68c0d4c3c4c8fedb286c791" FOREIGN KEY ("enrollmentId") REFERENCES "enrollments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "FK_3beaa6f7528e9bffff291dac30a" FOREIGN KEY ("modalityId") REFERENCES "modalities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rooms" ADD CONSTRAINT "FK_e9d4d68c8c47b7fe47b8e233f60" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_e9d4d68c8c47b7fe47b8e233f60"`);
    await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_3beaa6f7528e9bffff291dac30a"`);
    await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_8fbb68c0d4c3c4c8fedb286c791"`);
    await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_e5da8f98cb11a226d03a09fae5a"`);
    await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "FK_de33d443c8ae36800c37c58c929"`);
    await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "UQ_de33d443c8ae36800c37c58c929"`);
    await queryRunner.query(`ALTER TABLE "enrollments" DROP COLUMN "purchaseId"`);
    await queryRunner.query(`DROP TABLE "hotels"`);
    await queryRunner.query(`DROP TABLE "rooms"`);
    await queryRunner.query(`DROP TABLE "accommodations"`);
    await queryRunner.query(`DROP TABLE "purchases"`);
    await queryRunner.query(`DROP TABLE "modalities"`);
  }
}
