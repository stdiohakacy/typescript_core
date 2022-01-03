export class UserAuthenticated {
    token: string;
    userId: string;
    roleId: string;
    constructor(token: string, userId: string, roleId: string){
        this.token = token;
        this.userId = userId;
        this.roleId = roleId;
    }
}