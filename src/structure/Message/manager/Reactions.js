import MessageReaction from '../MessageReaction'

export class MessageReactions extends Map {
    constructor(client, rawData) {
        super()
        rawData.reactions?.forEach(reaction => {
            super.set(reaction.emoji.id || reaction.emoji.name, new MessageReaction(client, {
                reaction,
                channelId: rawData.channelId,
                guildId: rawData.guildId
            }))
        })
    }
    
}