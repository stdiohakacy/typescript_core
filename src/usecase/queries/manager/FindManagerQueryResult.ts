import { Manager } from "../../../domain/manager/Manager";

export class FindManagerQueryResult {
    id: string;
    createdAt: Date;
    roleId: string;
    firstName: string;
    lastName: string | null;
    email: string;
    avatar: string | null;

    constructor(data: Manager) {
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.roleId = data.roleId;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.avatar = data.avatar;
    }
}
