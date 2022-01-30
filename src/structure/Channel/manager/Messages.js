import Cache from '../../../Cache.js'
import Message from '../../Message/Message.js'

// support single-fetch: true
// support fetch-all: true
export class ChannelMessages extends Cache {
  constructor(client, rawData) {
    /* rawData {
    *    id: ChannelId,
    *    options: { expiredTime: Integer }
    *  }
    */
    super(client, {
      path: `https://discord.com/api/v9/channels/${rawData.id}/messages/`,
      fetchReturn: Message,
      expiredTime: rawData.options?.expiredTime
    })
  }
  
}