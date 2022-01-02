import { BASE_SCHEMA } from "./BaseSchema";

export const AUTH_SCHEMA = {
    TABLE_NAME: 'auth',
    COLUMNS: {
        ...BASE_SCHEMA.COLUMNS,
        ID: 'id',
        USER_ID: 'user_id',
        TYPE: 'type',
        USERNAME: 'username',
        PASSWORD: 'password',
        FORGOT_KEY: 'forgot_key',
        FORGOT_EXPIRE: 'forgot_expire'
    },
    RELATED_ONE: {
        USER: 'user'
    },
    RELATED_MANY: {}
}