import { Client } from "../../../domain/client/Client";
import { GenderType } from "../../../enums/GenderType";

export class GetClientByIdQueryResult {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    roleId: string;
    firstName: string;
    lastName: string | null;
    email: string;
    avatar: string | null;
    gender: GenderType | null;
    birthday: string | null;
    phone: string | null;
    address: string | null;
    culture: string | null;
    currency: string | null;
    activatedAt: Date | null;
    archivedAt: Date | null;

    constructor(client: Client) {
        this.id = client.id;
        this.createdAt = client.createdAt;
        this.updatedAt = client.updatedAt;
        this.deletedAt = client.deletedAt;
        this.roleId = client.roleId;
        this.firstName = client.firstName;
        this.lastName = client.lastName;
        this.email = client.email;
        this.avatar = client.avatar;
        this.gender = client.gender;
        this.birthday = client.birthday;
        this.phone = client.phone;
        this.address = client.address;
        this.culture = client.culture;
        this.currency = client.currency;
        this.activatedAt = client.activatedAt;
        this.archivedAt = client.archivedAt;
    }
}