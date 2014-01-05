var chai = require('chai'),
  expect = chai.expect,
  WunderApi = require('../lib/wunder_api');

describe('WunderApi', function () {
  describe('constructor', function () {
    it('to set api key', function () {
      var wunderApi = new WunderApi('1', null, 'forecast');
      expect(wunderApi.apiKey).to.equal('1');
    });
    it('to set features', function () {
      var wunderApi = new WunderApi('1', null, 'forecast', 'geolookup');
      expect(wunderApi.features).to.equal('forecast/geolookup');
    });
    it('to set features from cli', function () {
      var wunderApi = new WunderApi('1', null, 'forecast,geolookup');
      expect(wunderApi.features).to.equal('forecast/geolookup');
    });
    it('to set settings', function () {
      var wunderApi = new WunderApi('1', {lang: 'ES', pws: '0', bestfct: '0'}, 'forecast');
      expect(wunderApi.settings).to.equal('lang:ES/pws:0/bestfct:0');
    });
  });
});