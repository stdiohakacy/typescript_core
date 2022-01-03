import { Service } from 'typedi';
import { Brackets, QueryRunner } from 'typeorm';
import { BaseRepository } from '../../base/repository/BaseRepository';
import { FindManagerFilter, IManagerRepository } from '../../base/repository/IManagerRepository';
import { SortType } from '../../database/DbTypes';
import { IDbQueryRunner } from '../../database/IDbQueryRunner';
import { Manager } from '../../domain/manager/Manager';
import { ManagerDb } from '../../entity/ManagerDb';
import { ManagerStatus } from '../../enums/ManagerStatus';
import { MANAGER_SCHEMA } from '../../schema/ManagerSchema';

@Service('manager.repository')
export class ManagerRepository extends BaseRepository<Manager, ManagerDb, string> implements IManagerRepository {
    constructor() {
        super(ManagerDb, MANAGER_SCHEMA);
    }

    override async findAndCount(param: FindManagerFilter): Promise<[Manager[], number]> {
        let query = this.repository.createQueryBuilder(MANAGER_SCHEMA.TABLE_NAME)
            .where(`${MANAGER_SCHEMA.TABLE_NAME}.${MANAGER_SCHEMA.COLUMNS.STATUS} = :status`, { status: param.status || ManagerStatus.ACTIVATED });

        if (param.keyword) {
            const keyword = `%${param.keyword}%`;
            query = query.andWhere(new Brackets(qb => {
                qb.where(`${MANAGER_SCHEMA.TABLE_NAME}.${MANAGER_SCHEMA.COLUMNS.FIRST_NAME} || ' ' || ${MANAGER_SCHEMA.TABLE_NAME}.${MANAGER_SCHEMA.COLUMNS.LAST_NAME} ILIKE :keyword`, { keyword })
                    .orWhere(`${MANAGER_SCHEMA.TABLE_NAME}.${MANAGER_SCHEMA.COLUMNS.EMAIL} ILIKE :keyword`, { keyword });
            }));
        }

        query = query
            .orderBy(MANAGER_SCHEMA.TABLE_NAME + '.createdAt', SortType.DESC)
            .skip(param.skip)
            .take(param.limit);

        const [list, count] = await query.getManyAndCount();
        return [list.map(item => item.toEntity()), count];
    }

    async getByEmail(email: string, queryRunner?: IDbQueryRunner): Promise<Manager | undefined> {
        const result = await this.repository.createQueryBuilder(MANAGER_SCHEMA.TABLE_NAME, queryRunner as QueryRunner)
            .andWhere(`LOWER(${MANAGER_SCHEMA.TABLE_NAME}.${MANAGER_SCHEMA.COLUMNS.EMAIL}) = LOWER(:email)`, { email })
            .getOne();
        return result?.toEntity();
    }

    async checkEmailExist(email: string, queryRunner?: IDbQueryRunner): Promise<boolean> {
        const query = this.repository.createQueryBuilder(MANAGER_SCHEMA.TABLE_NAME, queryRunner as QueryRunner)
            .select(`${MANAGER_SCHEMA.TABLE_NAME}.${MANAGER_SCHEMA.COLUMNS.ID}`)
            .where(`LOWER(${MANAGER_SCHEMA.TABLE_NAME}.${MANAGER_SCHEMA.COLUMNS.EMAIL}) = LOWER(:email)`, { email });

        const result = await query.getOne();
        return !!result;
    }
}
