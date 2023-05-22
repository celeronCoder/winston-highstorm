# winston-highstorm

It's a package to upload [winston](https://www.npmjs.com/package/winston)'s log steam to [Highstorm](https://highstorm.app).

## Usage

This is how you can use this package:

```js
// highstorm-transport.js
const { HighstormTransport } =  require("@celeroncoder/highstorm-winston");

const { HIGHSTORM_KEY } = process.env;

const highstorm = new HighstormTransport({
  token: HIGHSTORM_KEY!, // required
  channelName: "<chanel_name>", // required
});

export default highstorm;
```

```js
// logger.js
const winston = require('winston');
const highstorm = require("./highstorm-transport.js")

const logger = winston.createLogger({
  ...
  transports: [
	highstorm
  ],
  ...
});

```

- Add `HIGHSTORM_KEY` environment variable from the Highstorm dashboard.
- Make sure to use the recommended highstorm channel name format.

- You can also add default transport option when initializing the `HighstormTransport`.

## License

This package is under MIT License
