import {MigrationInterface, QueryRunner} from "typeorm";
import { IAuthRepository } from "../base/repository/IAuthRepository";
import { IManagerRepository } from "../base/repository/IManagerRepository";
import { IRoleRepository } from "../base/repository/IRoleRepository";
import { BUCKET_NAME } from "../configs/Configuration";
import { Manager } from "../domain/manager/Manager";
import { IRole } from "../domain/role/IRole";
import { Role } from "../domain/role/Role";
import { RoleId } from "../enums/RoleId";
import { AuthRepository } from "../repositories/auth/AuthRepository";
import { ManagerRepository } from "../repositories/manager/ManagerRepository";
import { RoleRepository } from "../repositories/role/RoleRepository";
import { ILogService } from "../services/logs/ILogService";
import { LogService } from "../services/logs/LogService";
import { IStorageService } from "../services/storage/IStoreService";
import { StorageService } from "../services/storage/StorageService";
import { v4 } from 'uuid'
import { IManager } from "../domain/manager/IManager";
import { ManagerStatus } from "../enums/ManagerStatus";
import { GenderType } from "../enums/GenderType";
import { Auth } from "../domain/auth/Auth";
import { AuthType } from "../enums/AuthType";

const logService: ILogService = new LogService();
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

        await initData(queryRunner);
        await initBucket();
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

/**
 * Initialize data for Role, User.
 * @param queryRunner QueryRunner
 */
 async function initData(queryRunner: QueryRunner): Promise<void> {
    const roleRepository: IRoleRepository = new RoleRepository();
    const managerRepository: IManagerRepository = new ManagerRepository();
    const authRepository: IAuthRepository = new AuthRepository();

    // Create roles

    let role = new Role({ id: RoleId.SUPER_ADMIN } as IRole);
    role.name = 'Super Admin';
    await roleRepository.create(role, queryRunner);

    role = new Role({ id: RoleId.MANAGER } as IRole);
    role.name = 'Manager';
    await roleRepository.create(role, queryRunner);

    role = new Role({ id: RoleId.CLIENT } as IRole);
    role.name = 'Client';
    await roleRepository.create(role, queryRunner);

    logService.info('\x1b[32m Create roles successfully. \x1b[0m');

    // Create user "Super Admin"

    const manager = new Manager({ id: v4() } as IManager);
    manager.roleId = RoleId.SUPER_ADMIN;
    manager.status = ManagerStatus.ACTIVATED;
    manager.firstName = 'Super';
    manager.lastName = 'Admin';
    manager.email = 'admin@localhost.com';
    manager.gender = GenderType.MALE;

    const auth = new Auth();
    auth.userId = manager.id;
    auth.type = AuthType.PERSONAL_EMAIL;
    auth.username = manager.email;
    auth.password = 'Nodecore@2';

    await managerRepository.create(manager, queryRunner);
    await authRepository.create(auth, queryRunner);

    logService.info('\x1b[32m Create user "Super Admin" successfully. \x1b[0m');
}

/**
 * Initialize bucket.
 */
async function initBucket(): Promise<void> {
    const storageService: IStorageService = new StorageService();
    const policy = {
        Version: '2012-10-17',
        Statement: [{
            Sid: '',
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:GetBucketLocation'],
            Resource: [`arn:aws:s3:::${BUCKET_NAME}`]
        }, {
            Sid: '',
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:ListBucket'],
            Resource: [`arn:aws:s3:::${BUCKET_NAME}`],
            Condition: {
                StringEquals: {
                    's3:prefix': [
                        'images/',
                        'videos/',
                        'documents/'
                    ]
                }
            }
        }, {
            Sid: '',
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:GetObject'],
            Resource: [
                `arn:aws:s3:::${BUCKET_NAME}/images/*`,
                `arn:aws:s3:::${BUCKET_NAME}/videos/*`,
                `arn:aws:s3:::${BUCKET_NAME}/documents/*`
            ]
        }]
    };

    await storageService.createBucket(JSON.stringify(policy));
    logService.info('\x1b[32m Create bucket successfully. \x1b[0m');
}