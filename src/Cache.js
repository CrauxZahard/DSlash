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
      }
    })
    
    if(this.expiredTime >= 0) {
      setInterval(this.clearCache(), this.expiredTime)
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
  * @param {String} text to display
  * @returns {Void}
  */
  _debug(text, title) {
    return this.client.emit('debug', `[${title ?? 'Cache'}]: ${text}`)
  }
  
  
  /**
  * filter a cache.
  * @param {Function} fn function to filter
  * @returns {Cache}
  */
  filter(fn) {
    if(typeof(fn) !== 'function') throw new Error('Supplied parameter is not a function')
    
    for(const [key, value] of this) {
      if(!fn(value, key)) this.delete(key)
    }
    return this
  }
  
  
  /**
  * @param {Integer} amount to return. Default: 1
  * @param {String} type of Map to return. Valid choice: 'key', 'value', 'array'. Default: 'value'
  * @returns {String | Array<Object>} either key, value, or array of object with key and value pairs
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
  * @param {String} snowflake that identify something
  * @returns {Promise<Unknown>}
  */
  async fetch(snowflake) {
    try {
      const data = await this.client.api.get(this.path + snowflake)
      
      Object.defineProperty(data, '__timestamp', { value: Date.now(), writable: true })
      
      if(this.fetchReturnType) {
        if(typeof(this.fetchReturnType) === 'function') {
          super.set(data.id || data.name, new (this.fetchReturnType(data))(this.client, data) )
        }
        else {
          super.set(data.id || data.name, new (this.fetchReturnType)(this.client, data)) 
        }
        
        this._debug('fetching success')
        return super.get(data.id || data.name)
      }
      
      else {
        super.set(data.id || data.name, data)
        this._debug('fetching success')
        return data
      }
      
    }
    catch (err) {
      this._debug(`error while fetching ${snowflake}. Status Code: ${err.statusCode}. Message: ${err.message}`)
      throw err
    }
  }
  
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
