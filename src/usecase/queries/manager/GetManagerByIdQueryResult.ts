import { Manager } from './../../../domain/manager/Manager';

export class GetManagerByIdQueryResult {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    roleId: string;
    firstName: string;
    lastName: string | null;
    email: string;
    avatar: string | null;
    archivedAt: Date | null;

    constructor(data: Manager) {
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.roleId = data.roleId;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.avatar = data.avatar;
        this.archivedAt = data.archivedAt;
    }
}