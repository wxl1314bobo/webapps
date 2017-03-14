'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _nodeCrontab = require('node-crontab');

var _nodeCrontab2 = _interopRequireDefault(_nodeCrontab);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconList = {
  "star": "https://img.shields.io/github/stars/75team/thinkjs.svg?style=social&label=Star",
  "version": "https://img.shields.io/npm/v/thinkjs.svg?style=flat-square",
  "build": "https://img.shields.io/travis/75team/thinkjs.svg?style=flat-square",
  "coverage": "https://img.shields.io/coveralls/75team/thinkjs.svg?style=flat-square"
}; /**
    * generate icon on home page
    */

var fn = function fn() {
  think.log('icon job', 'CRONTAB');
  var keys = (0, _keys2.default)(iconList);
  keys.forEach(function (type) {
    var url = iconList[type];
    var filePath = think.RESOURCE_PATH + '/static/other/icon/' + type + '.svg';
    var bakFilePath = filePath + '.bak';
    var stream = _fs2.default.createWriteStream(bakFilePath);
    var req = _superagent2.default.get(url).timeout(5000);
    req.pipe(stream);
    req.on('end', function () {
      if (!think.isFile(bakFilePath)) {
        return;
      }
      var content = _fs2.default.readFileSync(bakFilePath, 'utf8').trim();
      if (content.indexOf('<svg xmlns') === 0) {
        _fs2.default.renameSync(bakFilePath, filePath);
        console.log('sync ' + type + ' success');
        console.log(bakFilePath, filePath);
      } else {
        _fs2.default.unlinkSync(bakFilePath);
      }
    });
    req.on('error', function () {
      if (think.isFile(bakFilePath)) {
        _fs2.default.unlinkSync(bakFilePath);
      }
    });
  });
};

if (think.env === 'production' && !think.cli) {
  fn();
  var jobId = _nodeCrontab2.default.scheduleJob('0 */1 * * *', fn);
}