#!/usr/bin/env node

'use strict';

var WunderApi = require('../index').WunderApi,
  argv = require('optimist')
    .usage('Query the Wunderground API: http://www.wunderground.com/weather/api/d/docs\nUsage: $0 <apiKey> <location> --features forecast,geolookup')
    .demand('features')
    .describe('features', 'List features')
    .argv,
  wunder = new WunderApi(argv._[0], null, argv.features);

wunder.query(argv._[1])
  .then(function (result) {console.log(result);})
  .fail(function (err) {console.log(err);})
  .done();