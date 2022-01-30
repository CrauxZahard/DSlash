import MessageEmbed from './MessageEmbed.js'
import MessageReactions from './manager/Reactions.js'
import MessageComponents from './manager/Components.js'
import MessageStickers from './manager/Stickers.js'
import User from '../User/User.js'
import ThreadChannel from '../Channel/ThreadChannel.js'

export class Message {
    constructor(client, rawData) {
        Object.defineProperty(this, 'client', { value: client })
        Object.defineProperty(this, 'rawAuthor', { value: rawData.author })
        this.id = rawData.id
        this.content = rawData.content
        this.tts = rawData.tts
        this.channelId = rawData.channel_id
        this.guildId = rawData.guild_id || null
        this.timestamp = rawData.timestamp
        this.editTimestamp = rawData.edited_timestamp || null
        this.embeds = rawData.embeds?.forEach(embed => new MessageEmbed(embed))
        this.attachments = rawData.attachments || null
        this.reactions = new MessageReactions(this.client, {reactions: rawData.reactions, channelId: this.channelId, guildId: this.guildId})
        this.pinned = rawData.pinned
        this.referencedMessage = rawData.referenced_message || null
        this.stickers = new MessageStickers(this.client, rawData.sticker_items)
        this.components = new MessageComponents(this.client, rawData.components)
        Object.defineProperty(this, 'rawThread', { value: rawData.thread })
        this.threadId = rawData.thread.id
        this.webhookId = rawData.webhook_id
        this.flags = BigInt(rawData.flags)
        this.mentions = {
            users: rawData.mentions,
            roles: rawData.mention_role,
            channels: rawData.mention_channel
        }
        this.type = rawData.type
        this.interaction = rawData.interaction
    }

    get author() {
        const exist = this.client.users.get(this.rawAuthor.id)
        if(!exist) {
            return new User(this.client, this.rawAuthor)
        }
        return exist
    }


    get channel() {
        return this.client.channels.get(this.channelId)
    }

    async edit(newData) {
        const result = await this.client.api.patch(`https://discord.com/api/v9/channels/${this.channelId}/messages/${this.id}`, newData)
        result.catch(console.warn)
        return (new Message(this.client, result))
    }

    async delete() {
        const result = await this.client.api.delete(`https://discord.com/api/v9/channels/${this.channelId}/messages/${this.id}`)
        result.catch(console.warn)
        return true
    }

    get thread() {
        const exist = this.client.channels.get(this.threadId)
        if(!exist) {
            return new ThreadChannel(this.client, this.rawThread)
        }
        return exist
    }
}