"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$logic$base) {
  (0, _inherits3.default)(_class, _think$logic$base);

  function _class() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _think$logic$base.call.apply(_think$logic$base, [this].concat(args))), _this), _this.version = "string|in:1.2,2.0,2.1,2.2|default:2.2", _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  /**
   * doc logic
   * @return {} []
   */
  _class.prototype.indexAction = function indexAction() {
    this.rules = {
      version: this.version
    };
  };
  /**
   * search action
   * @return {} []
   */


  _class.prototype.searchAction = function searchAction() {
    this.rules = {
      version: this.version,
      keyword: 'required'
    };
  };
  /**
   * single document
   * @return {} []
   */


  _class.prototype.singleAction = function singleAction() {
    this.rules = {
      version: this.version
    };
  };

  return _class;
}(think.logic.base);

exports.default = _class;