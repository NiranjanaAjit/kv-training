import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExperienceToEmployee1721205530784 implements MigrationInterface {
    name = 'AddExperienceToEmployee1721205530784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
    }

}
