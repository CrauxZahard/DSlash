export class Emoji {
    constructor(client, rawData) {
        this.id = rawData.id
        this.name = rawData.name
        this.roles = rawData.roles.reduce((_, c) => _.set(c), new Map())
        // this.user = rawData.user
        this.requireColons = rawData.require_colons
        this.managed = rawData.managed
        this.available = rawData.available
    }
}