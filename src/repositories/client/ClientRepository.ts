import { Service } from 'typedi';
import { Brackets, QueryRunner } from 'typeorm';
import { BaseRepository } from "../../base/repository/BaseRepository";
import { FindClientFilter, IClientRepository } from '../../base/repository/IClientRepository';
import { SortType } from '../../database/DbTypes';
import { IDbQueryRunner } from '../../database/IDbQueryRunner';
import { Client } from "../../domain/client/Client";
import { ClientDb } from "../../entity/ClientDb";
import { ClientStatus } from '../../enums/ClientStatus';
import { CLIENT_SCHEMA } from '../../schema/ClientSchema';

@Service('client.repository')
export class ClientRepository extends BaseRepository<Client, ClientDb, string> implements IClientRepository {
    constructor() {
        super(ClientDb, CLIENT_SCHEMA);
    }

    override async findAndCount(param: FindClientFilter): Promise<[Client[], number]> {
        let query = this.repository.createQueryBuilder(CLIENT_SCHEMA.TABLE_NAME)
            .where(`${CLIENT_SCHEMA.TABLE_NAME}.${CLIENT_SCHEMA.COLUMNS.STATUS} = :status`, { status: param.status || ClientStatus.ACTIVATED });

        if (param.keyword) {
            const keyword = `%${param.keyword}%`;
            query = query.andWhere(new Brackets(qb => {
                qb.where(`${CLIENT_SCHEMA.TABLE_NAME}.${CLIENT_SCHEMA.COLUMNS.FIRST_NAME} || ' ' || ${CLIENT_SCHEMA.TABLE_NAME}.${CLIENT_SCHEMA.COLUMNS.LAST_NAME} ILIKE :keyword`, { keyword })
                    .orWhere(`${CLIENT_SCHEMA.TABLE_NAME}.${CLIENT_SCHEMA.COLUMNS.EMAIL} ILIKE :keyword`, { keyword });
            }));
        }

        query = query
            .orderBy(CLIENT_SCHEMA.TABLE_NAME + '.createdAt', SortType.DESC)
            .skip(param.skip)
            .take(param.limit);

        const [list, count] = await query.getManyAndCount();
        return [list.map(item => item.toEntity()), count];
    }

    async getByEmail(email: string, queryRunner?: IDbQueryRunner): Promise<Client | undefined> {
        const result = await this.repository.createQueryBuilder(CLIENT_SCHEMA.TABLE_NAME, queryRunner as QueryRunner)
            .andWhere(`LOWER(${CLIENT_SCHEMA.TABLE_NAME}.${CLIENT_SCHEMA.COLUMNS.EMAIL}) = LOWER(:email)`, { email })
            .getOne();
        return result?.toEntity();
    }

    async checkEmailExist(email: string, queryRunner?: IDbQueryRunner): Promise<boolean> {
        const result = await this.repository.createQueryBuilder(CLIENT_SCHEMA.TABLE_NAME, queryRunner as QueryRunner)
            .select(`${CLIENT_SCHEMA.TABLE_NAME}.${CLIENT_SCHEMA.COLUMNS.ID}`)
            .andWhere(`LOWER(${CLIENT_SCHEMA.TABLE_NAME}.${CLIENT_SCHEMA.COLUMNS.EMAIL}) = LOWER(:email)`, { email })
            .getOne();
        return !!result;
    }
}