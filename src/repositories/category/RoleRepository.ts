import { ROLE_SCHEMA } from './../../schema/RoleSchema';
import { FindRoleCommonFilter, FindRoleFilter, IRoleRepository } from './../../base/repository/IRoleRepository';
import { BaseRepository } from "../../base/repository/BaseRepository";
import { Role } from "../../domain/role/Role";
import { RoleDb } from "../../entity/RoleDb";
import { SortType } from '../../database/DbTypes';
import { Service } from 'typedi';

@Service("role.repository")
export class RoleRepository extends BaseRepository<Role, RoleDb, string> implements IRoleRepository {
    constructor() {
        super(RoleDb, ROLE_SCHEMA)
    }

    async getAll(): Promise<Role[]> {
        const list = await this.repository.createQueryBuilder(ROLE_SCHEMA.TABLE_NAME)
        .orderBy(`${ROLE_SCHEMA.TABLE_NAME}.${ROLE_SCHEMA.COLUMNS.NAME}`, SortType.ASC)
        .getMany();

        return list.map(item => item.toEntity());
    }

    override async findAndCount(param: FindRoleFilter): Promise<[Role[], number]> {
        let query = this.repository.createQueryBuilder(ROLE_SCHEMA.TABLE_NAME);
        if(param.keyword) {
            const keyword = `%${param.keyword}%`;
            query = query.andWhere(`${ROLE_SCHEMA.TABLE_NAME}.${ROLE_SCHEMA.COLUMNS.NAME} ILIKE :keyword`, { keyword })
        }

        query = query
            .orderBy(`${ROLE_SCHEMA.TABLE_NAME}.${ROLE_SCHEMA.COLUMNS.NAME}`, SortType.ASC)
            .skip(param.skip)
            .take(param.limit);

        const [list, count] = await query.getManyAndCount();
        return [list.map(item => item.toEntity()), count];
    }
    async findCommonAndCount(param: FindRoleCommonFilter): Promise<[Role[], number]> {
        let query = this.repository.createQueryBuilder(ROLE_SCHEMA.TABLE_NAME)
            .select([
                `${ROLE_SCHEMA.TABLE_NAME}.${ROLE_SCHEMA.COLUMNS.ID}`,
                `${ROLE_SCHEMA.TABLE_NAME}.${ROLE_SCHEMA.COLUMNS.NAME}`
            ]);

        if (param.keyword) {
            const keyword = `%${param.keyword}%`;
            query = query.andWhere(`${ROLE_SCHEMA.TABLE_NAME}.${ROLE_SCHEMA.COLUMNS.NAME} ilike :keyword`, { keyword });
        }

        query = query
            .orderBy(`${ROLE_SCHEMA.TABLE_NAME}.${ROLE_SCHEMA.COLUMNS.NAME}`, SortType.ASC)
            .skip(param.skip)
            .take(param.limit);

        const [list, count] = await query.getManyAndCount();
        return [list.map(item => item.toEntity()), count];
    }
    async checkNameExist(name: string, excludeId: string | null = null): Promise<boolean> {
        let query = this.repository.createQueryBuilder(ROLE_SCHEMA.TABLE_NAME)
        .where(`lower(${ROLE_SCHEMA.TABLE_NAME}.${ROLE_SCHEMA.COLUMNS.NAME}) = lower(:name)`, { name });
        
        if(excludeId)
            query = query.andWhere(`${ROLE_SCHEMA.TABLE_NAME}.${ROLE_SCHEMA.COLUMNS.ID} != :id`, { id: excludeId });
        const result = await query.getOne();
        return !!result;
    }
}