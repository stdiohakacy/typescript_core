import { BASE_SCHEMA } from "./BaseSchema";

export const CHANNEL_SCHEMA = {
    TABLE_NAME: 'channel',
    COLUMNS: {
        ...BASE_SCHEMA.COLUMNS,
        ID: 'id',
        NAME: 'name',
        LAST_MESSAGE_ID: 'last_message_id',
        LAST_PERSON_ID: 'last_person_id',
        LAST_SEEN: 'last_seen'
    },
    RELATED_MANY: {
        // The field name that we're defined into entity to map the entity related.
        USER: 'users'
    }
};
