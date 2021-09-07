import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTicketsTable1630999468864 implements MigrationInterface {
  name = "AddTicketsTable1630999468864";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE \"accommodations\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"price\" integer NOT NULL, CONSTRAINT \"UQ_a534ee8eecda81beead042260cd\" UNIQUE (\"name\"), CONSTRAINT \"PK_a422a200297f93cd5ac87d049e8\" PRIMARY KEY (\"id\"))",
    );
    await queryRunner.query(
      "CREATE TABLE \"modalities\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"totalVacancy\" integer NOT NULL, \"availableVacancy\" integer NOT NULL, \"price\" integer NOT NULL, CONSTRAINT \"UQ_e6de06e62c9e55b41a875f9d4fa\" UNIQUE (\"name\"), CONSTRAINT \"PK_4135bf3c2e5bb971c20b08bbef1\" PRIMARY KEY (\"id\"))",
    );
    await queryRunner.query(
      "CREATE TABLE \"tickets\" (\"id\" SERIAL NOT NULL, \"modalityId\" integer NOT NULL, \"accommodationId\" integer NOT NULL, \"totalPrice\" integer NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_343bc942ae261cf7a1377f48fd0\" PRIMARY KEY (\"id\"))",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE \"tickets\"");
    await queryRunner.query("DROP TABLE \"modalities\"");
    await queryRunner.query("DROP TABLE \"accommodations\"");
  }
}
