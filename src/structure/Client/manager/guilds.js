import Cache from '../../../Cache';
import Guild from '../../Guild/guild';

export class ClientGuilds extends Cache {
  constructor(client, options) {
    super(client, {
      path: 'https://discord.com/api/v9/guilds/',
      fetchReturnType: Guild,
      expiredTime: options.expiredTime
    })
  }
}