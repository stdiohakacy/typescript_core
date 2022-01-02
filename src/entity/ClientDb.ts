import { Column, Entity } from "typeorm";
import { Client } from "../domain/client/Client";
import { IClient } from "../domain/client/IClient";
import { ClientStatus } from "../enums/ClientStatus";
import { CLIENT_SCHEMA } from "../schema/ClientSchema";
import { UserDb } from "./UserDb";

@Entity(CLIENT_SCHEMA.TABLE_NAME)
export class ClientDb extends UserDb implements IClient {
    @Column('enum', { name: CLIENT_SCHEMA.COLUMNS.STATUS, enum: ClientStatus, default: ClientStatus.INACTIVE })
    status: ClientStatus

    @Column('varchar', { name: CLIENT_SCHEMA.COLUMNS.EMAIL, length: 120 })
    email: string;

    @Column('varchar', { name: CLIENT_SCHEMA.COLUMNS.PHONE, length: 20, nullable: true })
    phone: string | null;

    @Column('varchar', { name: CLIENT_SCHEMA.COLUMNS.ADDRESS, length: 200, nullable: true })
    address: string | null;

    @Column('varchar', { name: CLIENT_SCHEMA.COLUMNS.CULTURE, length: 5, nullable: true })
    culture: string | null;

    @Column('varchar', { name: CLIENT_SCHEMA.COLUMNS.CURRENCY, length: 3, nullable: true })
    currency: string | null;

    @Column('varchar', { name: CLIENT_SCHEMA.COLUMNS.ACTIVE_KEY, length: 64, nullable: true })
    activeKey: string | null;

    @Column('timestamptz', { name: CLIENT_SCHEMA.COLUMNS.ACTIVE_EXPIRE, nullable: true })
    activeExpire: Date | null;

    @Column('timestamptz', { name: CLIENT_SCHEMA.COLUMNS.ACTIVED_AT, nullable: true })
    activatedAt: Date | null;

    @Column('timestamptz', { name: CLIENT_SCHEMA.COLUMNS.ARCHIVED_AT, nullable: true })
    archivedAt: Date | null;

    override toEntity(): Client {
        return new Client(this);
    }

    override fromEntity(entity: Client) {
        return entity.toData()
    }
}