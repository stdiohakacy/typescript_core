import { RoleId } from "../../../enums/RoleId";

export class CreateManagerCommand {
    roleAuthId: RoleId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}