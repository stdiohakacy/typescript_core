import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseDbEntity } from "../base/entity/BaseDbEntity";
import { IRole } from "../domain/role/IRole";
import { Role } from "../domain/role/Role";
import { ROLE_SCHEMA } from "../schema/RoleSchema";

@Entity(ROLE_SCHEMA.TABLE_NAME)
export class RoleDb extends BaseDbEntity<Role> implements IRole {
    @PrimaryGeneratedColumn('uuid', { name: ROLE_SCHEMA.COLUMNS.ID })
    id: string;

    @Column('varchar', { name: ROLE_SCHEMA.COLUMNS.NAME, length: 50 })
    name: string;

    toEntity(): Role {
        return new Role(this);
    }

    fromEntity(entity: Role) {
        return entity.toData();
    }
}