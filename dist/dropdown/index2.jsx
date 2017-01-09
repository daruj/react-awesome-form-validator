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

/**
 * Dropdown - params:
 * options: Array of { value: string, text: string }
 * selectedOption: value of selected option (string)
 * defaultOptionVisible: if true it will render a default option as the first option of the dropdown.
 * defaultOptionText: text of default option
 * onChange: function to be called when the user selects a new option of the dropdown.
*/
var Dropdown = function (_InputBaseComponent) {
  _inherits(Dropdown, _InputBaseComponent);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    var _this$props = _this.props,
        selectedOption = _this$props.selectedOption,
        defaultOptionVisible = _this$props.defaultOptionVisible;


    var defaultOption = (defaultOptionVisible == undefined || defaultOptionVisible) && (!selectedOption || selectedOption == '');

    _this.state = {
      defaultOptionVisible: defaultOption
    };
    return _this;
  }

  _createClass(Dropdown, [{
    key: '_onChange',
    value: function _onChange(value) {
      var _props = this.props,
          onChange = _props.onChange,
          _props$validate = _props.validate,
          validate = _props$validate === undefined ? function () {
        return true;
      } : _props$validate,
          setInputValue = _props.setInputValue;

      var validateInput = validate(value);
      this.setState({
        defaultOptionVisible: false,
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
    key: 'renderDefaultOption',
    value: function renderDefaultOption() {
      if (this.state.defaultOptionVisible) {
        return _react2.default.createElement(
          'option',
          { value: '' },
          this.props.defaultOptionText || 'Select'
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          options = _props2.options,
          selectedOption = _props2.selectedOption,
          _props2$fieldClassNam = _props2.fieldClassName,
          fieldClassName = _props2$fieldClassNam === undefined ? _styles2.default.wrapperField : _props2$fieldClassNam,
          name = _props2.name,
          _props2$invalidClassN = _props2.invalidClassName,
          invalidClassName = _props2$invalidClassN === undefined ? _styles2.default.invalidField : _props2$invalidClassN,
          _props2$className = _props2.className,
          className = _props2$className === undefined ? _styles2.default.dropdown : _props2$className;


      return _react2.default.createElement(
        'div',
        { className: fieldClassName },
        this.renderLabel(),
        _react2.default.createElement(
          'select',
          {
            onChange: function onChange(event) {
              return _this2._onChange(event.target.value);
            },
            value: selectedOption,
            ref: name,
            name: name,
            className: (0, _classnames2.default)(!this.inputIsValid() ? invalidClassName : '', className)
          },
          this.renderDefaultOption(),
          options.map(function (opt, index) {
            return _react2.default.createElement(
              'option',
              { value: opt.value, key: index },
              opt.text
            );
          })
        ),
        this.renderError()
      );
    }
  }]);

  return Dropdown;
}(_inputBaseComponent2.default);

Dropdown.propTypes = {
  fieldClassName: _react2.default.PropTypes.string,
  options: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    value: _react2.default.PropTypes.string.isRequired,
    text: _react2.default.PropTypes.string.isRequired
  })).isRequired,
  name: _react2.default.PropTypes.string.isRequired,
  className: _react2.default.PropTypes.string,
  invalidClassName: _react2.default.PropTypes.string,
  selectedOption: _react2.default.PropTypes.string,
  defaultOptionVisible: _react2.default.PropTypes.bool,
  defaultOptionText: _react2.default.PropTypes.string,
  onChange: _react2.default.PropTypes.func,
  validate: _react2.default.PropTypes.func,
  setValidInputToUndefined: _react2.default.PropTypes.func,
  setInputValue: _react2.default.PropTypes.func
};

exports.default = Dropdown;
//# sourceMappingURL=index2.jsx.map
