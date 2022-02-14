import Channel from "../Channel";

// base
export class ThreadChannel extends Channel {
    constructor(client, rawData) {
        super(client, rawData)
        this.ownerId = rawData.owner_id
        this.lastMessageId = rawData.last_message_id
        this.parentId = rawData.parent_id
        this.metadata = {
            archived = rawData.thread_metadata.archived,
            autoArchiveDuration = rawData.thread_metadata.auto_archive_duration,
            archiveTimestamp = rawData.thread_metadata.archive_timestamp,
            locked = rawData.thread_metadata.locked
        }
    }
}