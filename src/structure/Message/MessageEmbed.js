export class MessageEmbed {
    constructor(rawData) {
        this.title = rawData.title || null
        this.type = rawData.type || null
        this.description = rawData.description || null
        this.color = rawData.color || null
        this.footer = rawData.footer || {}
        this.image = rawData.image || {}
        this.thumbnail = rawData.thumbnail || {}
        this.fields = rawData.fields || []
        this.author = rawData.author || {}
    }

    
    setTitle(text) {
        this.title = text
        return this
    }
    
    
    setDescription(text) {
        this.description = text
        return this
    }

    setFields(...field) {
        field.forEach(f => this.fields.push(f))
        return this
    } 
    
    
    setAuthor(data) {
        this.author = data
        return this
    }
    
    
    setImage(pathOrURL) {
        this.image = {         
            url: pathOrURL
        }
        return this
    }
    
    
    setThumbnail(pathOrURL) {
        this.thumbnail = {
            url: pathOrURL
        }
        return this
    }
    
    
    setFooter(text, iconURL) {
        this.footer = {
            text: text,
            icon_url: iconURL
        }
        return this
    }
    
    
    setTimestamp(date = Date.now()) {
        if (date instanceof Date) date = date.getTime()
        this.timestamp = date
        return this
    }
}