import { RoleId } from './../../../enums/RoleId';

export class UpdateManagerCommand {
    roleAuthId: RoleId;
    id: string;
    firstName: string;
    lastName: string | null;
}