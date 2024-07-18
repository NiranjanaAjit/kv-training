import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToEmployee1721205908770 implements MigrationInterface {
    name = 'AddStatusToEmployee1721205908770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
    }

}
