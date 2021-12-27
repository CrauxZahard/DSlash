import Cache from '../../../Cache'
import User from '../../User/user'

export class ClientUsers extends Cache {
  constructor(client, options) {
    super(client, {
      path: 'https://discord.com/api/v9/users/',
      fetchReturnType: User,
      expiredTime: options.expiredTime
    })
  }
}
