import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { IBaseEntity } from '../../domain/IBaseEntity';
import { BASE_SCHEMA } from '../../schema/BaseSchema';

export abstract class BaseDbEntity<T extends IBaseEntity> {
    @CreateDateColumn({ name: BASE_SCHEMA.COLUMNS.CREATED_AT, type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: BASE_SCHEMA.COLUMNS.UPDATED_AT, type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: BASE_SCHEMA.COLUMNS.DELETED_AT, type: 'timestamptz', nullable: true })
    deletedAt?: Date;

    /* Handlers */

    abstract toEntity(): T;
    abstract fromEntity(entity: T): IBaseEntity;
}
