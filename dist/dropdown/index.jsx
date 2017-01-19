'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _inputBaseComponent = require('../inputBaseComponent');

var _inputBaseComponent2 = _interopRequireDefault(_inputBaseComponent);

var _dropdown = require('./dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * DropdownWrapper - params:
 * options: Array of { value: string, text: string }
 * value: value of selected option (string)
 * defaultOptionVisible: if true it will render a default option as the first option of the dropdown.
 * defaultOptionText: text of default option
 * onChange: function to be called when the user selects a new option of the dropdown.
*/
var DropdownWrapper = function (_InputBaseComponent) {
  _inherits(DropdownWrapper, _InputBaseComponent);

  function DropdownWrapper(props) {
    _classCallCheck(this, DropdownWrapper);

    var _this = _possibleConstructorReturn(this, (DropdownWrapper.__proto__ || Object.getPrototypeOf(DropdownWrapper)).call(this, props));

    _this.state = {
      value: _this.props.value || ''
    };
    return _this;
  }

  _createClass(DropdownWrapper, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var forceDirty = _ref.forceDirty;

      if (this.props.forceDirty != forceDirty && forceDirty) {
        this.props.validate(this.props.value);
      }
    }
  }, {
    key: '_onChange',
    value: function _onChange(value) {
      this.props.validate(value);
      this.setState({ value: value });
      this.props.onChange(value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: this.props.fieldClassName },
        this.renderLabel(),
        _react2.default.createElement(_dropdown2.default, _extends({}, this.props, {
          onChange: function onChange(value) {
            return _this2._onChange(value);
          },
          inputIsValid: function inputIsValid() {
            return _this2.inputIsValid();
          }
        })),
        this.renderError()
      );
    }
  }]);

  return DropdownWrapper;
}(_inputBaseComponent2.default);

DropdownWrapper.propTypes = {
  fieldClassName: _react2.default.PropTypes.string,
  name: _react2.default.PropTypes.string.isRequired,
  onChange: _react2.default.PropTypes.func,
  validate: _react2.default.PropTypes.func
};

exports.default = DropdownWrapper;
//# sourceMappingURL=index.jsx.map
