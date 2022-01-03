import { GenderType } from "../../../enums/GenderType";
import { RoleId } from "../../../enums/RoleId";

export class CreateClientCommand {
    roleAuthId: RoleId;
    firstName: string;
    lastName: string | null;
    email: string;
    password: string;
    gender: GenderType | null;
    birthday: string | null;
    phone: string | null;
    address: string | null;
    culture: string | null;
    currency: string | null;
}