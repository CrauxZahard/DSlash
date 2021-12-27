import Cache from '../../../Cache'
import Channel from '../../Channel/channel'

export class ClientChannels extends Cache {
  constructor(client, options) {
    super(client, {
      path: 'https://discord.com/api/v9/channels/',
      fetchReturnType: (data) => Channel.returnClass(data.type),
      expiredTime: options.expiredTime
    })
  }
}
