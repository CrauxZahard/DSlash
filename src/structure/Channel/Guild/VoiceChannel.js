import GuildChannel from './GuildChannel.js';


export class VoiceChannel extends GuildChannel {
  constructor(client, rawData) {
    super(client, {id: rawData.id, type: rawData.type})
    this.bitrate = rawData.bitrate
    this.userLimit = rawData.user_limit
    this.name = rawData.name
    this.parentId = rawData.parent_id
    this.region = rawData.rtc_region
    this.position = rawData.position
    this.nsfw = rawData.nsfw
    this.videoQuality = rawData.video_quality_mode
  }
  
  
  edit(data) {
    /*
    data {
      name: 'new name', // converted to 'new-name'
      position: 1,
      bitrate: 90000, // should be in range of 8,000 to 96,000 (128,000 for vip? server)
      limit: 5 // 0 for no-limit, or in range of 1 to 99
    }
    */
    let finalData = {}
    if(data.name) finalData.name = data.name.split(' ').join('-')
    if(data.position) finalData.position = data.position
    if(data.bitrate) finalData.bitrate = data.bitrate
    if(data.limit) finalData.user_limit = data.limit
        
    const result = await this.client.api.patch(`https://discord.com/api/v9/channels/${this.id}`, finalData)
    result.catch(console.warn)
    return (new VoiceChannel(this.client, result))
  }
  
}