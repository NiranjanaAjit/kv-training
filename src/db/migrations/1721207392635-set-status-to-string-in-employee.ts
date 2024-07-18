import { MigrationInterface, QueryRunner } from "typeorm";

export class SetStatusToStringInEmployee1721207392635 implements MigrationInterface {
    name = 'SetStatusToStringInEmployee1721207392635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "status" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "status" DROP NOT NULL`);
    }

}
