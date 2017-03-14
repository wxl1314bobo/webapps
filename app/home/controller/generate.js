'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _base2 = require('./base.js');

var _base3 = _interopRequireDefault(_base2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * invoke in command line
 */
var _class = function (_base) {
  (0, _inherits3.default)(_class, _base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _base.apply(this, arguments));
  }

  _class.prototype.init = function init(http) {
    _base.prototype.init.call(this, http);
    this.rootPath = think.ROOT_PATH + '/view_build';
  };

  _class.prototype.__before = function __before() {
    if (!think.cli) {
      this.fail();
    }
  };

  /**
   * mardown to html
   * @return {} []
   */


  _class.prototype.htmlAction = function htmlAction() {
    var _this2 = this;

    var files = think.getFiles(this.rootPath).filter(function (file) {
      var ext = _path2.default.extname(file);
      return ext === '.md';
    });
    files.forEach(function (file) {
      var filePath = _this2.rootPath + '/' + file;
      var htmlPath = filePath.replace('.md', '.html');
      var content = _this2.markdownToHtml(filePath);
      _fs2.default.writeFileSync(htmlPath, content);
      //fs.unlinkSync(filePath);
    });
  };
  /**
   * single doc page
   * @return {} []
   */


  _class.prototype.singleAction = function singleAction() {
    var _this3 = this;

    var rootPath = think.ROOT_PATH + '/view';
    var langs = _fs2.default.readdirSync(rootPath);
    langs.forEach(function (lang) {
      var docPath = rootPath + '/' + lang + '/doc';
      var versions = _fs2.default.readdirSync(docPath);
      versions.forEach(function (version) {
        _this3.generateSingleDoc(lang, version);
      });
    });
  };

  return _class;
}(_base3.default);

exports.default = _class;