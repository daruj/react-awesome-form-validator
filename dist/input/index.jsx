'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputBaseComponent2 = require('../InputBaseComponent');

var _InputBaseComponent3 = _interopRequireDefault(_InputBaseComponent2);

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
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.setValidInputToUndefined();
    }
  }, {
    key: 'renderError',
    value: function renderError() {
      if (this.state.errorMessage && !this.isPristine() && !this.state.valid) {
        return _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'span',
            null,
            this.state.errorMessage
          )
        );
      }
    }
  }, {
    key: 'changeValue',
    value: function changeValue(value) {
      var _props = this.props,
          onChange = _props.onChange,
          _props$validate = _props.validate,
          validate = _props$validate === undefined ? function () {
        return true;
      } : _props$validate,
          setInputValue = _props.setInputValue;

      var validateInput = validate(value);
      this.setState({
        valid: validateInput.valid,
        dirty: true,
        errorMessage: validateInput.errorMessage
      });
      // set value to the inputValues form
      setInputValue(value);
      // if we pass onChange as a prop then use it!
      if (onChange) {
        onChange(value);
      }
    }
  }, {
    key: 'renderLabel',
    value: function renderLabel() {
      if (this.props.label) {
        return _react2.default.createElement(
          'label',
          null,
          this.props.label
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          _props2$fieldClassNam = _props2.fieldClassName,
          fieldClassName = _props2$fieldClassNam === undefined ? _styles2.default.wrapperField : _props2$fieldClassNam,
          _props2$type = _props2.type,
          type = _props2$type === undefined ? 'text' : _props2$type,
          _props2$placeHolder = _props2.placeHolder,
          placeHolder = _props2$placeHolder === undefined ? '' : _props2$placeHolder,
          name = _props2.name,
          _props2$className = _props2.className,
          className = _props2$className === undefined ? _styles2.default.input : _props2$className,
          _props2$invalidClassN = _props2.invalidClassName,
          invalidClassName = _props2$invalidClassN === undefined ? _styles2.default.invalidField : _props2$invalidClassN;

      return _react2.default.createElement(
        'div',
        {
          className: fieldClassName
        },
        this.renderLabel(),
        _react2.default.createElement('input', {
          type: type,
          name: name,
          placeholder: placeHolder,
          className: (0, _classnames2.default)(!this.inputIsValid() ? invalidClassName : '', className),
          ref: name,
          onKeyUp: function onKeyUp(evt) {
            return _this2.changeValue(evt.target.value);
          },
          onBlur: function onBlur(evt) {
            return _this2.changeValue(evt.target.value);
          }
        }),
        this.renderError()
      );
    }
  }]);

  return Input;
}(_InputBaseComponent3.default);

Input.propTypes = {
  fieldClassName: _react2.default.PropTypes.string,
  type: _react2.default.PropTypes.string.isRequired,
  placeHolder: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  name: _react2.default.PropTypes.string.isRequired,
  className: _react2.default.PropTypes.string,
  invalidClassName: _react2.default.PropTypes.string,
  validate: _react2.default.PropTypes.func,
  setValidInputToUndefined: _react2.default.PropTypes.func,
  onChange: _react2.default.PropTypes.func
};

exports.default = Input;
//# sourceMappingURL=index.jsx.map
