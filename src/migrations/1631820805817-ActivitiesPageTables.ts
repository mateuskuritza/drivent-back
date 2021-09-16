import { MigrationInterface, QueryRunner } from "typeorm";

export class ActivitiesPageTables1631820805817 implements MigrationInterface {
  name = "ActivitiesPageTables1631820805817";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event_days" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_9503f237e42c686fd32876089bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "locations" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "activitiesUsers" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "activityId" integer NOT NULL, CONSTRAINT "PK_214ca190c9b6f0190914240c47f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "activities" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "eventDayId" integer NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "vacancy" integer NOT NULL, "locationId" integer NOT NULL, CONSTRAINT "PK_7f4004429f731ffb9c88eb486a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "activitiesUsers" ADD CONSTRAINT "FK_6a961861d183d919ddaf648b6f4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "activitiesUsers" ADD CONSTRAINT "FK_73bbb98e63729202fb95d386399" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "activities" ADD CONSTRAINT "FK_4cfa6561a3127b224e5c3ff2c1e" FOREIGN KEY ("eventDayId") REFERENCES "event_days"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "activities" ADD CONSTRAINT "FK_74b92be5924b9fb1d808b4ffcd4" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_74b92be5924b9fb1d808b4ffcd4"`);
    await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_4cfa6561a3127b224e5c3ff2c1e"`);
    await queryRunner.query(`ALTER TABLE "activitiesUsers" DROP CONSTRAINT "FK_73bbb98e63729202fb95d386399"`);
    await queryRunner.query(`ALTER TABLE "activitiesUsers" DROP CONSTRAINT "FK_6a961861d183d919ddaf648b6f4"`);
    await queryRunner.query(`DROP TABLE "activities"`);
    await queryRunner.query(`DROP TABLE "activitiesUsers"`);
    await queryRunner.query(`DROP TABLE "locations"`);
    await queryRunner.query(`DROP TABLE "event_days"`);
  }
}
