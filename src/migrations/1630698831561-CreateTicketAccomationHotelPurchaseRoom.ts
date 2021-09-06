import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTicketAccomationHotelPurchaseRoom1630698831561 implements MigrationInterface {
    name = "CreateTicketAccomationHotelPurchaseRoom1630698831561"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"accommodations\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"price\" integer NOT NULL, CONSTRAINT \"PK_a422a200297f93cd5ac87d049e8\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"tickets\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"price\" integer NOT NULL, CONSTRAINT \"PK_343bc942ae261cf7a1377f48fd0\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"purchases\" (\"id\" SERIAL NOT NULL, \"accommodationId\" integer NOT NULL, \"enrollmentsId\" integer NOT NULL, \"ticketId\" integer NOT NULL, CONSTRAINT \"REL_2036e0bacee29c6bd999de07f4\" UNIQUE (\"ticketId\"), CONSTRAINT \"REL_e5da8f98cb11a226d03a09fae5\" UNIQUE (\"accommodationId\"), CONSTRAINT \"PK_1d55032f37a34c6eceacbbca6b8\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"rooms\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"size\" integer NOT NULL, \"available\" integer NOT NULL, \"hotelId\" integer, CONSTRAINT \"PK_0368a2d7c215f2d0458a54933f2\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"hotels\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"image\" character varying NOT NULL, \"size\" integer NOT NULL, \"vacancies\" integer, CONSTRAINT \"PK_2bb06797684115a1ba7c705fc7b\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD \"purchaseId\" integer");
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD CONSTRAINT \"UQ_25058561c95f2a9549b0e3cbfc4\" UNIQUE (\"purchaseId\")");
      await queryRunner.query("ALTER TABLE \"purchases\" ADD CONSTRAINT \"FK_2036e0bacee29c6bd999de07f4e\" FOREIGN KEY (\"ticketId\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"purchases\" ADD CONSTRAINT \"FK_e5da8f98cb11a226d03a09fae5a\" FOREIGN KEY (\"accommodationId\") REFERENCES \"accommodations\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD CONSTRAINT \"FK_25058561c95f2a9549b0e3cbfc4\" FOREIGN KEY (\"purchaseId\") REFERENCES \"purchases\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP CONSTRAINT \"FK_25058561c95f2a9549b0e3cbfc4\"");
      await queryRunner.query("ALTER TABLE \"purchases\" DROP CONSTRAINT \"FK_e5da8f98cb11a226d03a09fae5a\"");
      await queryRunner.query("ALTER TABLE \"purchases\" DROP CONSTRAINT \"FK_2036e0bacee29c6bd999de07f4e\"");
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP CONSTRAINT \"UQ_25058561c95f2a9549b0e3cbfc4\"");
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP COLUMN \"purchaseId\"");
      await queryRunner.query("DROP TABLE \"hotels\"");
      await queryRunner.query("DROP TABLE \"rooms\"");
      await queryRunner.query("DROP TABLE \"purchases\"");
      await queryRunner.query("DROP TABLE \"tickets\"");
      await queryRunner.query("DROP TABLE \"accommodations\"");
    }
}
