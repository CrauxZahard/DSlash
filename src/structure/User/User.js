export class User {
    constructor(bot, rawData) {
        this.id = rawData.id
        this.name = rawData.name
        this.icon = rawData.icon
    }

    iconURL(ext = 'jpg' , size = '2048') {
        if(ext.startsWith('.')) ext = ext.slice(0, -1)
        return `https://cdn.discord.com/avatars/${this.id}/${this.icon}.${ext}?size=${size}`
    }
}