# Wunderground weather API Node.js module using Q Promises.

> Access the [Wunderground](http://www.wunderground.com/weather/api/d/docs) API with [Nodejs](http://nodejs.org).

## Features

Combines multiple queries into 1 as explained [here](http://www.wunderground.com/weather/api/d/docs?d=data/index&MR=1). Queries return Q Promises. This module is a very simple wrapper around the API. Review the docs for valid location values, settings and features. In most cases, arguments passed into this module are sent directly to the API as-is.

## Dependencies

API queries return a Promise via [Q](http://documentup.com/kriskowal/q/). The cli depends on [optimist](https://npmjs.org/package/optimist).

## Installation

To install via NPM type the following: `npm install wunderground-api-client`

(use `npm install -g wunderground-api-client` to add a bin script to your path)

You can also install via git by cloning:

```shell
git clone https://github.com/lukewendling/wunderground-api-client.git /path/to/project
```

## Usage

```js
var WunderApi = require('./').WunderApi;

// see http://www.wunderground.com/weather/api/d/docs?d=data/index&MR=1
// for expected features values and format of the location arg
var combined = new WunderApi(APIKEY, null, 'geolookup', 'forecast');

combined.query('TX/Austin')
  .then(function (result) {console.log(result)})
  .fail(function (err) {console.dir(err)})
  .done();
```

```shell
wunder-api APIKEY TX/Austin --features forecast,geolookup
```
