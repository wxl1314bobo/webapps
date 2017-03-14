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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_base) {
  (0, _inherits3.default)(_class, _base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _base.apply(this, arguments));
  }

  /**
   * homepage
   * @return {} []
   */
  _class.prototype.indexAction = function indexAction() {
    return this.display();
  };
  /**
   * changelog page
   * @return {} []
   */


  _class.prototype.changelogAction = function changelogAction() {
    this.assign('currentNav', 'changelog');
    this.assign('title', this.locale('title-changelog'));
    return this.display();
  };
  /**
   * demo list
   * @return {} []
   */


  _class.prototype.demoAction = function demoAction() {
    this.assign('currentNav', 'demo');
    this.assign('title', this.locale('title-demo'));
    //this.assign('hasBootstrap', true);
    return this.display();
  };
  /**
   * plugin page
   * @return {[type]} [description]
   */


  _class.prototype.pluginAction = function pluginAction() {
    this.assign('currentNav', 'plugin');
    this.assign('title', this.locale('title-plugin'));
    //this.assign('hasBootstrap', true);
    return this.display();
  };
  /**
   * donate page
   * @return {[type]} [description]
   */


  _class.prototype.donateAction = function donateAction() {
    this.lang('zh-cn', true);
    this.assign('currentNav', 'donate');
    this.assign('title', this.locale('title-donate'));
    return this.display();
  };
  /**
   * about page
   * @return {} []
   */


  _class.prototype.aboutAction = function aboutAction() {
    this.lang('zh-cn', true);
    this.assign('title', this.locale('title-about'));
    return this.display();
  };
  /**
   * spending page
   * @return {} 
   */


  _class.prototype.spendingAction = function spendingAction() {
    this.lang('zh-cn', true);
    this.assign('title', this.locale('title-spending'));
    return this.display();
  };
  /**
   * event
   * @return {} 
   */


  _class.prototype.eventAction = function eventAction() {
    this.lang('zh-cn', true);
    this.assign('title', this.locale('title-event'));
    return this.display();
  };

  return _class;
}(_base3.default);

exports.default = _class;