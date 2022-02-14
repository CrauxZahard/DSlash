import Channel from "../Channel";

export class GuildChannel extends Channel {
    constructor(client, rawData) {
        super(client, rawData)
        this.guildId = rawData.guild_id
        this.name = rawData.name
        this.position = rawData.position
        this.permissionOverwrites = rawData.permisssion_overwrites
        this.parentId = rawData.parent_id
    }
}