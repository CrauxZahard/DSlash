import clientApi from './structure/Client/api'
import ClientUsers from './structure/Client/manager/users'
import ClientGuilds from './structure/Client/manager/guilds'
import ClientChannels from './structure/Client/manager/channels'
import BaseInteraction from './structure/Interaction/baseInteraction'
import Fastify from 'fastify'
import Debug from './util/debugger'

export class Client {
  constructor(data = {}) {
    clientApi(this)
    
    Object.defineProperties(this, {
      endpoint: {
        value: data.endpoint 
      },
      application: {
        value: {
          id: data.applicationId, //needed to make slash command
          route: `https://discord.com/api/v9/applications/${data.applicationId}/`
        }
      },
      token: {
        value: data.token 
      },
      _debug: {
        value: (new Debug('Client', this)).debug
      }
    })
    
    // cache
    this.users = new ClientUsers(this)
    this.guilds = new ClientGuilds(this)
    this.channels = new ClientChannels(this)
  }
  
  
  async addCommand(data, guildId = null) {   
    if(guildId === null) {
      this._debug('trying to make a global slash command...')
      return (await this.api.post(this.application.route + 'commands', data))
    } 
    else {
      this._debug('trying to make slash command in guild id: ' + guildId)
      return (await this.api.post(`${this.application.route}guilds/${guildId}/commands`, data))
    }
  }
  
  
  createServer(port) {
    const server = Fastify()
    
    server.post(this.endpoint, (req, res) => {
      const interaction = new BaseInteraction(req, res)
      if(interaction.validate() === true) {
        this.emit('interaction', interaction)
      }
    })
    
    server.listen(port)
  }
  
  
}
