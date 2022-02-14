import Channel from "../Channel";

export class GroupDm extends Channel {
    constructor(client, rawData) {
        super(client, rawData)
        this.recipients = rawData.recipients
        this.icon = rawData.icon
        this.ownerId = rawData.owner_id
    }
}