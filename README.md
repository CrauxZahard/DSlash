# DSlash
a Discord API framework using REST API instead of gateway

## Required external package
- [axios](https://www.npmjs.com/package/axios)
- [fastify](https://www.npmjs.com/package/fastify) (to make a REST API)
- [tweetnacl](https://www.npmjs.com/package/tweetnacl) (to validate interaction request)
- [body-parser](https://www.npmjs.com/package/body-parser) (to parse http request body)
- additionally, you should have [Node.js](https://nodejs.org/en/) with version 16.x installed.

### If you are going to use this
You shouldn't expect to receive any gateway events such as receiving message from an user. Anything you wanna do should be an application command or an interaction (e.g buttons, select menu, etc.)

### Contributions are welcomed!
You can contribute by:
- Report unclear doucmentation
- Report a bug
- Implement new features
