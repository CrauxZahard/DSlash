import MessageComponent from '../MessageComponent.js'
export class MessageComponents extends Map {
    constructor(client, components) {
        super()
        components?.forEach(component => {
            super.set(component.id, new MessageComponent(client, component))
        })
    } 
}