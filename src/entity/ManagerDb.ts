import { MANAGER_SCHEMA } from './../schema/ManagerSchema';
import { Column, Entity } from 'typeorm';
import { IManager } from '../domain/manager/IManager';
import { Manager } from '../domain/manager/Manager';
import { ManagerStatus } from '../enums/ManagerStatus';
import { UserDb } from './UserDb';


@Entity(MANAGER_SCHEMA.TABLE_NAME)
export class ManagerDb extends UserDb implements IManager {
    @Column('enum', { name: MANAGER_SCHEMA.COLUMNS.STATUS, enum: ManagerStatus  })
    status: ManagerStatus;

    @Column('varchar', { name: MANAGER_SCHEMA.COLUMNS.EMAIL, length: 120 })
    email: string;

    @Column('timestamptz', { name: MANAGER_SCHEMA.COLUMNS.ARCHIVED_AT, nullable: true })
    archivedAt: Date | null;

    override toEntity(): Manager {
        return new Manager(this);
    }

    override fromEntity(entity: Manager) {
        return entity.toData();
    }
}