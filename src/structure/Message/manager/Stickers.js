import MessageSticker from '../MessageSticker.js'

export class MessageStickers extends Map {
    constructor(client, stickers) {
        super()
        stickers?.forEach(sticker => {
            super.set(sticker.id, new MessageSticker(client, sticker))
        })
    }
}