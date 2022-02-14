import GuildChannel from "./GuildChannel";

export class GuildCategory extends GuildChannel.js {
    constructor(client, rawData) {
        super(client, rawData)
        this.nsfw = rawData.nsfw
    }
}