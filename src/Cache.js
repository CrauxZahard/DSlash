import Debug from './util/debugger.js';

export class Cache extends Map {
  constructor(client, opt = {}) {
    super()
    
    Object.defineProperties(this, {
      client: {
        value: client
      },
      path: {
        value: opt.path.endsWith('/') ? opt.path : (opt.path + '/')
      },
      fetchReturnType: {
        value: opt.fetchReturnType
      },
      expiredTime: {
        value: opt.expiredTime || 21_600_000
      },
      _debug: {
        value: (new Debug('Cache', client)).debug
      }
    })
    
    if(this.expiredTime >= 0) {
      setInterval(this.clearCache, this.expiredTime)
    }
  }
  
  // map method
  get(key) {
    return super.get(key)
  }
  
  
  set(key, value) {
    return super.set(key, value) 
  }
  
  
  clear() {
    return super.clear()
  }
  
  
  has(key) {
    return super.has(key) 
  }
  
  
  delete(key) {
    return super.delete(key) 
  }
  
  // Custom Function
  
  
  /**
  * filter a cache.
  * @param {Function} fn function to filter
  * @returns {Cache} Cache class
  */
  filter(fn) {
    if(typeof(fn) !== 'function') throw new Error('Supplied parameter is not a function')
    
    for(const [key, value] of this) {
      if(!fn(value, key)) this.delete(key)
    }

    return this
  }
  
  
  /**
  * @param {Integer} amount amount to return. Default: 1
  * @param {String} type type of Map to return. Valid choice: 'key', 'value', or 'array'. Default: 'value'
  * @returns {String | Array<any>} either key, value, or Object[]<key, value>
  */
  first(amount = 1, type = 'value') {
    if(amount <= 0) return new Error('\'amount\' parameter should be equals or greater than 1')
    
    if(type == 'array') {
      const arr = [...super.entries()]
      arr.slice(0, amount)
      const returnedArray = []
      arr.forEach(element => returnedArray.push({key: element[0], value: element[1]}) )
      return returnedArray
    }
    
    if(type == 'key') {
      const arr = [...super.keys()]
      return arr.slice(0, amount)
    }
    
    if(type == 'value') {
      const arr = [...super.values()]
      return arr.slice(0, amount)
    }
    return new Error('Specified \'type\' parameter is not valid.\nExpected: either \'key\', \'value\', or \'array\'.\nInstead got: \'' + type + '\'')
  }
  
  
  /**
  * fetches something from pre-defined path.
  * @param {String} snowflake a snowflake that identify something
  * @returns {Promise<Any>} resolves with data, or rejects with an instance of Error
  */
  async fetch(snowflake) {
    try {
      const data = await this.client.api.get(this.path + snowflake)
      
      Object.defineProperty(data, '__timestamp', { value: Date.now(), writable: true })
      
      switch(typeof(this.fetchReturnType)) {
        case 'function':
          super.set(data.id || data.name, new (this.fetchReturnType(data))(this.client, data))
          break;
          
        case 'undefined':
          super.set(data.id || data.name, data)
          break;
          
        default:
          super.set(data.id || data.name, new (this.fetchReturnType)(this.client, data))
      }

      this._debug('fetching success')
      return super.get(data.id || data.name)
      
    }
    catch (err) {
      this._debug(`error while fetching ${snowflake}. Status Code: ${err.statusCode}. Message: ${err.message}`)
      throw err
    }
  }
  
  /** 
  * fetches all datas from this url
  * @returns {Promise<boolean | Error>} resolves with true, or rejects with instance of Error
  */
  async fetchAll() {
    const baseURL = this.path.endsWith('/') ? this.path.slice(0, -1) : this.path
    try {
      const Data = await this.client.api.get(baseURL)
      
      Data.forEach(data => {
        Object.defineProperty(data, '__timestamp', {value: Date.now(), writable: true})
        super.set(data.id || data.name, new (this.fetchReturnType)(this.client, data))
      })
      this._debug('success fetched all data from the url.')
      return true
    }
    catch (err) {
      this._debug('an error has occured while fetching all data!.\n' + `Status Code: ${err.statusCode}\nMessage: ${err.message}`)
      throw err
    }
  }
  
  /**
  * clear an expired data
  * @returns {Boolean} always true
  */
  clearCache() {
    
    this.filter(data => {
        return (data.__timestamp + this.expiredTime) <= Date.now() 
    })
    
    this._debug('clearing cache...')
    
    return true
  }
  
}
