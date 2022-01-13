import { BASE_SCHEMA } from "./BaseSchema";

export const MESSAGE_SCHEMA = {
    TABLE_NAME: 'messages',
    COLUMNS: {
        ...BASE_SCHEMA.COLUMNS,
        CHANNEL_ID: 'channel_id',
        USER_ID: 'user_id',
        CONTENT: 'content',
        TYPE: 'type',
        STATUS: 'status'
    },
};
