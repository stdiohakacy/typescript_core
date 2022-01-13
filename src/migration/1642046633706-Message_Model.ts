import {MigrationInterface, QueryRunner} from "typeorm";

export class MessageModel1642046633706 implements MigrationInterface {
    name = 'MessageModel1642046633706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."message_type_enum" AS ENUM('chat', 'system')`);
        await queryRunner.query(`CREATE TYPE "public"."message_status_enum" AS ENUM('sent', 'received', 'seen')`);
        await queryRunner.query(`CREATE TABLE "message" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "channel_id" uuid NOT NULL, "user_id" uuid NOT NULL, "content" character varying, "type" "public"."message_type_enum" NOT NULL DEFAULT 'chat', "status" "public"."message_status_enum" NOT NULL DEFAULT 'sent', CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_f6d0a3bccef803efd6d5102655c" FOREIGN KEY ("channel_id") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_f6d0a3bccef803efd6d5102655c"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TYPE "public"."message_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."message_type_enum"`);
    }

}
