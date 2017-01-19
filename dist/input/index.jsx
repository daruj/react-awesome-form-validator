'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _inputBaseComponent = require('../inputBaseComponent');

var _inputBaseComponent2 = _interopRequireDefault(_inputBaseComponent);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_InputBaseComponent) {
  _inherits(Input, _InputBaseComponent);

  function Input(props) {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));
  }

  _createClass(Input, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$fieldClassName = _props.fieldClassName,
          fieldClassName = _props$fieldClassName === undefined ? _styles2.default.wrapperField : _props$fieldClassName,
          _props$type = _props.type,
          type = _props$type === undefined ? 'text' : _props$type,
          _props$placeHolder = _props.placeHolder,
          placeHolder = _props$placeHolder === undefined ? '' : _props$placeHolder,
          name = _props.name,
          _props$className = _props.className,
          className = _props$className === undefined ? _styles2.default.input : _props$className,
          _props$invalidClassNa = _props.invalidClassName,
          invalidClassName = _props$invalidClassNa === undefined ? _styles2.default.invalidField : _props$invalidClassNa,
          value = _props.value,
          _props$startValidatin = _props.startValidatingWhenIsPristine,
          startValidatingWhenIsPristine = _props$startValidatin === undefined ? false : _props$startValidatin;

      return _react2.default.createElement(
        'div',
        { className: fieldClassName },
        this.renderLabel(),
        _react2.default.createElement('input', {
          type: type,
          name: name,
          value: value,
          autoComplete: 'off',
          placeholder: placeHolder,
          className: (0, _classnames2.default)(!this.inputIsValid() ? invalidClassName : '', className),
          ref: name,
          onChange: function onChange(evt) {
            var value = evt.target.value;
            _this2.props.onChange(value);
            if (startValidatingWhenIsPristine) {
              _this2.props.validate(value);
            } else {
              if (!_this2.isPristine()) {
                _this2.props.validate(value);
              }
            }
          },
          onBlur: function onBlur(evt) {
            var value = evt.target.value;
            _this2.props.onChange(value);
            _this2.props.validate(value);
          }
        }),
        this.renderError()
      );
    }
  }]);

  return Input;
}(_inputBaseComponent2.default);

Input.propTypes = {
  fieldClassName: _react2.default.PropTypes.string,
  type: _react2.default.PropTypes.string.isRequired,
  placeHolder: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  name: _react2.default.PropTypes.string.isRequired,
  value: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  invalidClassName: _react2.default.PropTypes.string,
  validate: _react2.default.PropTypes.func,
  onChange: _react2.default.PropTypes.func,
  startValidatingWhenIsPristine: _react2.default.PropTypes.bool
};

exports.default = Input;
//# sourceMappingURL=index.jsx.map
