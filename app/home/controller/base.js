'use strict';

exports.__esModule = true;

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

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _markedToc = require('marked-toc');

var _markedToc2 = _interopRequireDefault(_markedToc);

var _highlight = require('highlight.js');

var _highlight2 = _interopRequireDefault(_highlight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$controller$bas) {
  (0, _inherits3.default)(_class, _think$controller$bas);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
  }

  /**
   * before magic method
   * @return {} []
   */
  _class.prototype.__before = function __before() {
    this.assign({
      title: this.locale('title-home'),
      currentNav: '',
      hasBootstrap: false,
      hasVersion: false,
      lang: this.http.lang()
    });
  };
  /**
   * generate toc name
   * @param  {String} name []
   * @return {String}      []
   */


  _class.prototype.generateTocName = function generateTocName(name) {
    name = name.trim().replace(/\s+/g, '').replace(/\)/g, '').replace(/[\(\,]/g, '-').toLowerCase();
    if (/^[\w\-]+$/.test(name)) {
      return name;
    }
    return 'toc-' + think.md5(name).slice(0, 3);
  };
  /**
   * markdown to html
   * @return {} []
   */


  _class.prototype.markdownToHtml = function markdownToHtml(filePath) {
    var _this2 = this;

    var content = _fs2.default.readFileSync(filePath, 'utf8');

    var tocContent = (0, _marked2.default)((0, _markedToc2.default)(content)).replace(/<a\s+href="#([^\"]+)">([^<>]+)<\/a>/g, function (a, b, c) {
      return '<a href="#' + _this2.generateTocName(c) + '">' + c + '</a>';
    });

    var markedContent = (0, _marked2.default)(content).replace(/<h(\d)[^<>]*>(.*?)<\/h\1>/g, function (a, b, c) {
      if (b == 2) {
        return '<h' + b + ' id="' + _this2.generateTocName(c) + '">' + c + '</h' + b + '>';
      }
      return '<h' + b + ' id="' + _this2.generateTocName(c) + '"><a class="anchor" href="#' + _this2.generateTocName(c) + '"></a>' + c + '</h' + b + '>';
    });
    markedContent = markedContent.replace(/<h(\d)[^<>]*>([^<>]+)<\/h\1>/, function (a, b, c) {
      return a + '<div class="toc">' + tocContent + '</div>';
    });

    var highlightContent = markedContent.replace(/<pre><code\s*(?:class="lang-(\w+)")?>([\s\S]+?)<\/code><\/pre>/mg, function (a, language, text) {
      text = text.replace(/&#39;/g, '\'').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/\&quot;/g, '"').replace(/\&amp;/g, "&");
      var result = _highlight2.default.highlightAuto(text, language ? [language] : undefined);
      return '<pre><code class="hljs lang-' + result.language + '">' + result.value + '</code></pre>';
    });

    return highlightContent;
  };

  /**
   * generate single doc file
   * @return {} []
   */


  _class.prototype.generateSingleDoc = function generateSingleDoc(lang, version) {
    var filePath = think.RESOURCE_PATH + '/static/module/thinkjs/thinkjs_' + lang + '_' + version + '.md';
    think.mkdir(_path2.default.dirname(filePath));

    var jsonPath = think.ROOT_PATH + '/view/' + lang + '/doc/' + version + '/sidebar.json';
    var content = _fs2.default.readFileSync(jsonPath);
    var data = JSON.parse(content);

    var doc = ['# ThinkJS ' + version + ' Documentation'];
    for (var type in data) {
      doc.push('# ' + type);
      for (var name in data[type]) {
        var docFilePath = think.ROOT_PATH + '/view/' + lang + '/doc/' + version + '/' + data[type][name] + '.md';
        var _content = _fs2.default.readFileSync(docFilePath, 'utf8');
        doc.push(_content);
      }
    }
    doc = doc.join('\n\n');
    _fs2.default.writeFileSync(filePath, doc);
  };

  return _class;
}(think.controller.base);

exports.default = _class;