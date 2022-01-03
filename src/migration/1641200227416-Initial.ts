import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1641200227416 implements MigrationInterface {
    name = 'Initial1641200227416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."auth_type_enum" AS ENUM('personal_email', 'personal_phone')`);
        await queryRunner.query(`CREATE TABLE "auth" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "type" "public"."auth_type_enum" NOT NULL, "username" character varying(120) NOT NULL, "password" character varying(32) NOT NULL, "forgot_key" character varying(64), "forgot_expire" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_8b0be371d28245da6e4f4b6187" ON "categories" ("name") `);
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role_id" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying, "avatar" character varying, "gender" character varying(6), "birthday" date, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."client_status_enum" AS ENUM('activated', 'inactive', 'archived')`);
        await queryRunner.query(`CREATE TABLE "client" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role_id" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying, "avatar" character varying, "gender" character varying(6), "birthday" date, "status" "public"."client_status_enum" NOT NULL DEFAULT 'inactive', "email" character varying(120) NOT NULL, "phone" character varying(20), "address" character varying(200), "culture" character varying(5), "currency" character varying(3), "active_key" character varying(64), "active_expire" TIMESTAMP WITH TIME ZONE, "actived_at" TIMESTAMP WITH TIME ZONE, "archived_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id")) INHERITS ("users")`);
        await queryRunner.query(`CREATE TYPE "public"."manager_status_enum" AS ENUM('activated', 'archived')`);
        await queryRunner.query(`CREATE TABLE "manager" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role_id" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying, "avatar" character varying, "gender" character varying(6), "birthday" date, "status" "public"."manager_status_enum" NOT NULL, "email" character varying(120) NOT NULL, "archived_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01" PRIMARY KEY ("id")) INHERITS ("users")`);
        await queryRunner.query(`CREATE TABLE "role" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "manager"`);
        await queryRunner.query(`DROP TYPE "public"."manager_status_enum"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TYPE "public"."client_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8b0be371d28245da6e4f4b6187"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`DROP TYPE "public"."auth_type_enum"`);
    }

}
