import { USER_SCHEMA } from "./UserSchema";

export const MANAGER_SCHEMA = {
    TABLE_NAME: 'manager',
    COLUMNS: {
        ...USER_SCHEMA.COLUMNS,
        STATUS: 'status',
        EMAIL: 'email',
        ARCHIVED_AT: 'archived_at'
    },
    RELATED_ONE: {},
    RELATED_MANY: {}
}