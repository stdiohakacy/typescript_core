import { BASE_SCHEMA } from "./BaseSchema";

export const USER_SCHEMA = {
    TABLE_NAME: "users",
    COLUMNS: {
        ...BASE_SCHEMA.COLUMNS,
        ID: 'id',
        ROLE_ID: 'role_id',
        FIRST_NAME: 'first_name',
        LAST_NAME: 'last_name',
        AVATAR: 'avatar',
        GENDER: 'gender',
        BIRTHDAY: 'birthday',
    },
    RELATED_ONE: {
    },
    RELATED_MANY: {
        AUTHS: 'auths'
    }
}