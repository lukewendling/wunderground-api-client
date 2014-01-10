'use strict';

var q = require('q'),
  http = require('http'),
  url = require('url');

module.exports = WunderApi;

// apikey
// settings: object, set to null to take defaults
// features: indefinite list (splatted)
function WunderApi (apiKey, settings /*, features */) {
  var args = Array.prototype.slice.call(arguments, 2),
    features = [];
  
  settings = settings || {};

  // cli passes comma-delimited features string.
  if (args.length === 1 && args[0].indexOf(',') > -1) {
    args = args[0].split(',');
  }
  
  args.forEach(function (arg) {
    features.push(arg);
  });

  this.apiKey = apiKey;
  settings = {
    lang: settings.lang || 'EN',
    pws: settings.pws || '1',
    bestfct: settings.bestfct || '1'
  };
  this.settings = urlOptionize(settings);
  this.features = features.join('/');
}

// convert object into url options format 'key:val/key:val/key:val'
function urlOptionize (obj) {
  return JSON.stringify(obj).replace(/["{}]/g,'').replace(/,/g, '/');
}

WunderApi.prototype.query = function (location) {
  var deferred = q.defer(),
    options,
    endpoint;
  
  options = {
    protocol: 'http',
    hostname: 'api.wunderground.com',
    pathname: ['api', this.apiKey, this.features, this.settings, 'q', location].join('/'),
    agent: false
  };

  endpoint = url.format(options) + '.json';
  console.log(endpoint);

  http.get(endpoint, function onResponse (res) {
    var data = [];
    res
      .on('data', function onData (chunk) { data.push(chunk); })
      .on('end', function onEnd () {
        data = data.join('').trim();
        var result;
        try {
          result = JSON.parse(data);
        } catch (err) {
          result = {'status_code': 500, 'status_text': 'JSON Parse Failed'};
          deferred.reject(new Error(result));
        }
        deferred.resolve(result);
      });
  })
  .on('error', function (err) {
    deferred.reject(new Error(err));
  });
  return deferred.promise;
};
