import { USER_SCHEMA } from "./UserSchema";

export const CLIENT_SCHEMA = {
    TABLE_NAME: 'client',
    COLUMNS: {
        ...USER_SCHEMA.COLUMNS,
        STATUS: 'status',
        EMAIL: 'email',
        PHONE: 'phone',
        ADDRESS: 'address',
        CULTURE: 'culture',
        CURRENCY: 'currency',
        ACTIVE_KEY: 'active_key',
        ACTIVE_EXPIRE: 'active_expire',
        ACTIVED_AT: 'actived_at',
        ARCHIVED_AT: 'archived_at'
    },
    RELATED_ONE: {
    },
    RELATED_MANY: {
    }
};
