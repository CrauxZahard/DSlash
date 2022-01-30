const permissions = {
    CREATE_INSTANT_INVITE: 0x1,
    KICK_MEMBERS: 0x2,
    BAN_MEMBERS: 0x4,
    ADMINISTRATOR: 0x8,
    MANAGE_CHANNELS: 0x10,
    MANAGE_GUILD: 0x20,
    ADD_REACTIONS: 0x40,
    VIEW_AUDIT_LOG: 0x80,
    PRIORITY_SPEAKER: 0x100,
    STREAM: 0x200,
    VIEW_CHANNEL: 0x400,
    SEND_MESSAGES: 0x800,
    SEND_TTS_MESSAGES: 0x1_000,
    MANAGE_MESSAGES: 0x2_000,
    EMBED_LINKS: 0x4_000,
    ATTACH_FILES: 0x8_000,
    READ_MESSAGE_HISTORY: 0x10_000,
    MENTION_EVERYONE: 0x20_000,
    USE_EXTERNAL_EMOJIS: 0x40_000,
    VIEW_GUILD_INSIGHTS: 0x80_000,
    CONNECT: 0x100_000,
    SPEAK: 0x200_000,
    MUTE_MEMBERS: 0x400_000,
    DEAFEN_MEMBERS: 0x800_000,
    MOVE_MEMBERS: 0x1_000_000,
    USE_VAD: 0x2_000_000,
    CHANGE_NICKNAME: 0x4_000_000,
    MANAGE_NICKNAMES: 0x8_000_000,
    MANAGE_ROLES: 0x10_000_000,
    MANAGE_WEBHOOKS: 0x20_000_000,
    MANAGE_EMOJIS_AND_STICKERS: 0x40_000_000,
    USE_APPLICATION_COMMANDS: 0x80_000_000,
    REQUEST_TO_SPEAK: 0x100_000_000, //it says under development, may be changed or removed later
    MANAGE_THREADS: 0x400_000_000,
    USE_PUBLIC_THREADS: 0x800_000_000,
    USE_PRIVATE_THREADS: 0x1_000_000_000,
    USE_EXTERNAL_STICKERS: 0x2_000_000_000
  }
  
  export default class Permissions {
    constructor(bit) {
      this.bit = bit
      if(typeof(bit) !== 'bigint') this.bit = BigInt(bit)
    }
    
    has(...perms) {
      
      //just some permission name check
      for(let index = 0; index < perms.length; index++) {
        if(!permissions[perms[index]]) throw new Error(`${perms[index]} is not a valid permission name.`)
      }
      
      const totalPerms = perms.reduce((a, b) => BigInt(permissions[a]) | BigInt(permissions[b]))
      
      return (this.bit & totalPerms) === totalPerms
    }
    
    
    hasAny(...perms) { 
      for(let index = 0; index < perms.length; index++) {
        // permission name check
        if(!permissions[perms[index]]) throw new Error(`${perms[index]} is not a valid permission name.`)
        
        // bit calculation check
        if( (this.bit & BigInt(permissions[perms[index]])) === BigInt(permissions[perms[index]]) ) return true
      }
      
      // all calculation from the loop return false
      return false
    }
    
    static bitFor(perm) {
      if(!permissions[perm]) throw new Error('supplied permission is not a valid name.')
      return permissions[perm]
    }
  }