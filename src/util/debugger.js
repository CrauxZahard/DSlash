export class Debug {
    constructor(className, client) {
        this.className = className
        this.client = client
    }

    debug(text) {
        const today = new Date()
        this.client.emit('debug', `[DSlash] |   ${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}   |   [${this.className}]: ${text}`)
    }
}