import { Role } from "../../../domain/role/Role";

export class GetRoleByIdQueryResult {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(role: Role) {
        this.id = role.id;
        this.name = role.name;
        this.createdAt = role.createdAt;
        this.updatedAt = role.updatedAt;
        this.deletedAt = role.deletedAt;
    }
}