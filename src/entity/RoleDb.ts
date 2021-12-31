import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseDbEntity } from "../base/entity/BaseDbEntity";
import { IRole } from "../domain/role/IRole";
import { Role } from "../domain/role/Role";

@Entity('role')
export class RoleDb extends BaseDbEntity<Role> implements IRole {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column('varchar', { name: 'name', length: 50 })
    name: string;

    toEntity(): Role {
        return new Role(this);
    }

    fromEntity(entity: Role) {
        return entity.toData();
    }
}