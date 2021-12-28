import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { IBaseEntity } from '../domain/IBaseEntity';

export abstract class BaseDbEntity<T extends IBaseEntity> {
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;

    /* Handlers */

    abstract toEntity(): T;
    abstract fromEntity(entity: T): IBaseEntity;
}
