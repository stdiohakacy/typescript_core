import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateLengthChannelName1641839883977 implements MigrationInterface {
    name = 'UpdateLengthChannelName1641839883977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "channel" ADD "name" character varying(150) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "channel" ADD "name" character varying(50) NOT NULL`);
    }

}
