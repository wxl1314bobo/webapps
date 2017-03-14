'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _markedToc = require('marked-toc');

var _markedToc2 = _interopRequireDefault(_markedToc);

var _base2 = require('./base.js');

var _base3 = _interopRequireDefault(_base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_base) {
  (0, _inherits3.default)(_class, _base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _base.apply(this, arguments));
  }

  /**
   * get sidebar json
   * @return {} []
   */
  _class.prototype.getSideBar = function getSideBar() {
    var lang = this.http.lang().toLowerCase();
    var version = this.get('version');
    var key = 'sidebar_' + lang + '_' + version;
    var data = thinkCache(thinkCache.APP, key);
    if (!data) {
      var filePath = think.ROOT_PATH + '/view/' + lang + '/doc/' + version + '/sidebar.json';
      var content = _fs2.default.readFileSync(filePath);
      data = JSON.parse(content);
      thinkCache(thinkCache.APP, key, data);
    }
    this.assign('sidebar', data);
    this.assign('lang', lang);
    this.assign('version', version);
  };
  /**
   * get parsed markdown content
   * @param  {String} filePath []
   * @return {Promise}          []
   */


  _class.prototype.getMarkedContent = function getMarkedContent(filePath) {
    var cache = this.config('cache_markdown_content');
    if (cache) {
      var content = thinkCache('markdown-doc', filePath);
      if (content) {
        return content;
      }
    }
    var markedContent = this.markdownToHtml(filePath);
    if (cache) {
      thinkCache('markdown-doc', filePath, markedContent);
    }
    return markedContent;
  };
  /**
   * get doc content
   * @return {} []
   */


  _class.prototype.getDoc = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var doc, lang, version, markedContent, filePath, htmlPath, titleReg, match;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              doc = this.get('doc');
              lang = this.http.lang().toLowerCase();
              version = this.get('version');
              markedContent = void 0;
              filePath = think.ROOT_PATH + '/view/' + lang + '/doc/' + version + '/' + doc + '.md';
              htmlPath = filePath.replace('.md', '.html');

              if (!think.isFile(htmlPath)) {
                _context.next = 10;
                break;
              }

              markedContent = _fs2.default.readFileSync(htmlPath, 'utf8');
              _context.next = 14;
              break;

            case 10:
              if (doc === 'single') {
                filePath = think.RESOURCE_PATH + '/static/module/thinkjs/thinkjs_' + lang + '_' + version + '.md';
                if (think.isFile(!filePath)) {
                  filePath = this.generateSingleDoc(this.http.lang().toLowerCase(), this.get('version'));
                }
              }

              if (think.isFile(filePath)) {
                _context.next = 13;
                break;
              }

              return _context.abrupt('return', _promise2.default.reject(new Error('/doc/' + doc + '.html is not exist')));

            case 13:
              markedContent = this.getMarkedContent(filePath);

            case 14:

              if (doc === 'single') {
                this.assign('title', '' + this.locale("all-doc") + this.locale("title-doc-suffix", version));
              } else {
                titleReg = /<h2(?:[^<>]*)>([^<>]+)<\/h2>/;
                match = markedContent.match(titleReg);

                if (match) {
                  this.assign('title', '' + match[1] + this.locale("title-doc-suffix", version));
                }
              }

              this.assign('markedContent', markedContent);
              this.assign('doc', doc);

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getDoc() {
      return _ref.apply(this, arguments);
    }

    return getDoc;
  }();
  /**
   * doc
   * @return {} []
   */


  _class.prototype.indexAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var doc;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              //this.expires(86400);

              //redirect index doc, avoid relative path in doc
              doc = this.get('doc');

              if (doc) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt('return', this.redirect('/doc/index.html'));

            case 3:

              this.assign('currentNav', 'doc');
              this.assign('hasBootstrap', true);
              this.assign('hasVersion', true);
              this.getSideBar();

              _context2.prev = 7;
              _context2.next = 10;
              return this.getDoc();

            case 10:
              _context2.next = 12;
              return this.display('doc/index');

            case 12:
              _context2.next = 19;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2['catch'](7);

              this.http.error = _context2.t0;
              _context2.next = 19;
              return think.statusAction(404, this.http);

            case 19:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[7, 14]]);
    }));

    function indexAction() {
      return _ref2.apply(this, arguments);
    }

    return indexAction;
  }();
  /**
   * view doc in single page
   * @return {} []
   */


  _class.prototype.singleAction = function singleAction() {
    this.get('doc', 'single');
    return this.indexAction();
  };
  /**
   * get search result
   * @param  {String} keyword []
   * @return {}         []
   */


  _class.prototype.getSearchResult = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(keyword) {
      var _this2 = this;

      var lang, version, cmd, fn, options, result, data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              lang = this.http.lang().toLowerCase();
              version = this.get('version');
              cmd = 'grep \'' + keyword + '\' -ri *.md';
              fn = think.promisify(_child_process2.default.exec, _child_process2.default);
              options = {
                cwd: think.ROOT_PATH + ('/view/' + lang + '/doc/' + version + '/')
              };
              //ignore command error

              _context3.next = 7;
              return fn(cmd, options).catch(function (err) {
                return '';
              });

            case 7:
              result = _context3.sent;
              data = {};

              result = result.split('\n').filter(function (item) {
                return item;
              }).map(function (item) {
                var pos = item.indexOf(':');
                var filename = item.substr(0, pos);
                if (!(filename in data)) {
                  data[filename] = { filename: filename, text: [] };
                }
                var text = item.substr(pos + 1);
                text = _this2.escapeHtml(text).replace(new RegExp(keyword, 'ig'), function (a) {
                  return '<span style="color:#c7254e">' + a + '</span>';
                });
                data[filename].text.push(text);
              });
              data = (0, _keys2.default)(data).map(function (item) {
                var itemData = data[item];
                var filePath = think.ROOT_PATH + '/view/' + lang + '/doc/' + version + '/' + itemData.filename;
                var content = _fs2.default.readFileSync(filePath, 'utf8').trim();
                content.replace(/#+([^\n]+)/, function (a, c) {
                  itemData.title = c;
                });
                return itemData;
              }).sort(function (a, b) {
                return a.text.length < b.text.length ? 1 : -1;
              });
              return _context3.abrupt('return', data);

            case 12:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getSearchResult(_x) {
      return _ref3.apply(this, arguments);
    }

    return getSearchResult;
  }();
  /**
   * escape html
   * @param  {String} str []
   * @return {}     []
   */


  _class.prototype.escapeHtml = function escapeHtml(str) {
    var htmlMaps = {
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return (str + '').replace(/[<>'"]/g, function (a) {
      return htmlMaps[a];
    });
  };
  /**
   * search action
   * @return {} []
   */


  _class.prototype.searchAction = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var keyword, result;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.assign('currentNav', 'doc');
              this.assign('hasBootstrap', true);
              this.assign('hasVersion', true);
              this.getSideBar();

              keyword = this.get('keyword').trim();

              this.assign('keyword', keyword);

              if (keyword) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt('return', this.display());

            case 8:
              _context4.next = 10;
              return this.getSearchResult(keyword);

            case 10:
              result = _context4.sent;

              this.assign('searchResult', result);
              this.display();

            case 13:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function searchAction() {
      return _ref4.apply(this, arguments);
    }

    return searchAction;
  }();

  return _class;
}(_base3.default);

exports.default = _class;