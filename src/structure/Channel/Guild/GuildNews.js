import GuildChannel  from "./GuildChannel";

export class GuildNews extends GuildChannel {
    constructor(client, rawData) {
        super(client, rawData)
        this.topic = rawData.topic
        this.nsfw = rawData.nsfw
        this.lastMessageId = rawData.last_message_id
    }
}