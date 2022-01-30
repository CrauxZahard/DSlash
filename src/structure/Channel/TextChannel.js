import Channel from './Channel.js';
import ChannelMessages from './manager/Messages.js';
import Message from '../message/Message.js'


export class TextChannel extends Channel {
  constructor(client, rawData) {
    super(client, {id: rawData.id, type: rawData.type})
    this.guildId = rawData.guildId
    this.messages = new ChannelMessages(client, {id: rawData.id, options: rawData.options})
  }
  
  
  send(data) {
    if(typeof(data.content) !== 'string') data.content.toString()
    
    if('embeds' in data) {
      // if its not an array, make it into a single array
      if(typeof(data.embeds) !== 'array' && typeof(data.embeds) === 'object') data.embeds = [data.embeds]
      
      // make embed description to a string if its not a string
      data.embeds.forEach((embed, index) => {
        if('description' in embed) {
          if(typeof(embed.description) !== 'string') data.embeds[index].description = data.embeds[index].description.toString()
        }
      })
      
      //send a message
      const result = await this.client.api.post(`https://discord.com/api/v9/channels/${this.id}/messages`, data)
      result.catch(console.warn)
      return (new Message(this.client, result))
    }
    
  }
  
  
}