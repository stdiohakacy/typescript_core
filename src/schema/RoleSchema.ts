import { BASE_SCHEMA } from "./BaseSchema";

export const ROLE_SCHEMA = {
    TABLE_NAME: 'role',
    COLUMNS: {
        ...BASE_SCHEMA.COLUMNS,
        ID: 'id',
        NAME: 'name'
    },
};
