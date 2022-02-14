import TextChannel from './TextChannel.js'
import VoiceChannel from './VoiceChannel.js'
import DmChannel from './DmChannel.js'

export class Channel {
    constructor(client, rawData) {
        Object.defineProperty(this, 'client', {value: client})
        Object.defineProperty(this, '_rawData', {value: rawData})
        this.id = rawData.id
        this.type = rawData.type 
    }

    mention() {
        if(this.type === 1) return `<@${this._rawData.recipients[0].id}>`
        return `<#${this.id}>`
    }

    async delete() {
        await this.client.api.delete(`https://discord.com/api/v9/channels/${this.id}`)
        .catch(console.warn)
    }
    
    static returnClass(type) {
        if(type === 0) return TextChannel
        if(type === 1) return DmChannel
        if(type === 2) return VoiceChannel
    }
}