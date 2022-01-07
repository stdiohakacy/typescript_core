import { GenderType } from './../../../enums/GenderType';

export class UpdateProfileClientCommand {
    userAuthId: string;
    firstName: string;
    lastName: string | null;
    gender: GenderType | null;
    birthday: string | null;
    phone: string | null;
    address: string | null;
    culture: string | null;
    currency: string | null;
}