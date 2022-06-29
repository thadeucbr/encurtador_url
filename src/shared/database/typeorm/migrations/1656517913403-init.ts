import {MigrationInterface, QueryRunner} from "typeorm";

export class init1656517913403 implements MigrationInterface {
    name = 'init1656517913403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Url" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "originalUrl" character varying NOT NULL, "shortUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_88d386351dd50725bbcffea8c06" UNIQUE ("originalUrl"), CONSTRAINT "UQ_a97bf3f3652de5446e312c36731" UNIQUE ("shortUrl"), CONSTRAINT "PK_125351eff80cb59a0403e6f9e63" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Url"`);
    }

}
