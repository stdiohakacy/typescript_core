import { RoleId } from "../enums/RoleId";

export class UserAuthenticated {
    token: string;
    userId: string;
    roleId: RoleId;

    constructor(token: string, userId: string, roleId: RoleId){
        this.token = token;
        this.userId = userId;
        this.roleId = roleId;
    }
}