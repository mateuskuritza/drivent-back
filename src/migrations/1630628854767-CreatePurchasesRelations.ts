import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePurchasesRelations1630628854767 implements MigrationInterface {
  name = "CreatePurchasesRelations1630628854767";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE \"purchases\" DROP CONSTRAINT \"FK_1c654a500f656a0514d756362ac\"");
    await queryRunner.query("ALTER TABLE \"purchases\" RENAME COLUMN \"eventTicketId\" TO \"ticketId\"");
    await queryRunner.query(
      "ALTER TABLE \"purchases\" RENAME CONSTRAINT \"REL_1c654a500f656a0514d756362a\" TO \"UQ_2036e0bacee29c6bd999de07f4e\"",
    );
    await queryRunner.query(
      "ALTER TABLE \"purchases\" ADD CONSTRAINT \"FK_2036e0bacee29c6bd999de07f4e\" FOREIGN KEY (\"ticketId\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE \"purchases\" DROP CONSTRAINT \"FK_2036e0bacee29c6bd999de07f4e\"");
    await queryRunner.query(
      "ALTER TABLE \"purchases\" RENAME CONSTRAINT \"UQ_2036e0bacee29c6bd999de07f4e\" TO \"REL_1c654a500f656a0514d756362a\"",
    );
    await queryRunner.query("ALTER TABLE \"purchases\" RENAME COLUMN \"ticketId\" TO \"eventTicketId\"");
    await queryRunner.query(
      "ALTER TABLE \"purchases\" ADD CONSTRAINT \"FK_1c654a500f656a0514d756362ac\" FOREIGN KEY (\"eventTicketId\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION",
    );
  }
}
