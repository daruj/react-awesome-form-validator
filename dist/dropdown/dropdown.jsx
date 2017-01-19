'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Dropdown - params:
 * options: Array of { value: string, text: string }
 * value: value of selected option (string)
 * defaultOptionVisible: if true it will render a default option as the first option of the dropdown.
 * defaultOptionText: text of default option
 * onChange: function to be called when the user selects a new option of the dropdown.
*/
var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    var _this$props = _this.props,
        value = _this$props.value,
        defaultOptionVisible = _this$props.defaultOptionVisible;


    var defaultOption = (defaultOptionVisible == undefined || defaultOptionVisible) && (!value || value == '');

    _this.state = {
      defaultOptionVisible: defaultOption,
      isOpened: false
    };
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var value = _ref.value,
          defaultOptionVisible = _ref.defaultOptionVisible;

      if (this.props.value != value && value === '') {
        var defaultOption = (defaultOptionVisible == undefined || defaultOptionVisible) && (!value || value == '');
        this.setState({ defaultOptionVisible: defaultOption });
      }
    }
  }, {
    key: '_onChange',
    value: function _onChange(value) {
      if (value !== '') {
        this.setState({ defaultOptionVisible: false });
      }
      this.props.onChange(value);
    }
  }, {
    key: 'clickInsideOfTheDropdown',
    value: function clickInsideOfTheDropdown() {
      this.setState({ isOpened: true });
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside() {
      if (this.state.isOpened) {
        this.props.onChange(this.refs[this.props.name].value);
        this.setState({ isOpened: false });
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

      var _props = this.props,
          options = _props.options,
          value = _props.value,
          name = _props.name,
          _props$invalidClassNa = _props.invalidClassName,
          invalidClassName = _props$invalidClassNa === undefined ? _styles2.default.invalidField : _props$invalidClassNa,
          _props$className = _props.className,
          className = _props$className === undefined ? _styles2.default.dropdown : _props$className,
          inputIsValid = _props.inputIsValid;


      return _react2.default.createElement(
        'select',
        {
          onChange: function onChange(event) {
            return _this2._onChange(event.target.value);
          },
          onClick: function onClick() {
            return _this2.clickInsideOfTheDropdown();
          },
          onKeyDown: function onKeyDown(event) {
            // if the user press the tab key
            if (event.which == 9) {
              _this2._onChange(event.target.value);
            }
          },
          onFocus: function onFocus() {
            return _this2.clickInsideOfTheDropdown();
          },
          value: value,
          ref: name,
          name: name,
          className: (0, _classnames2.default)(!inputIsValid() ? invalidClassName : '', className)
        },
        this.renderDefaultOption(),
        options.map(function (opt, index) {
          return _react2.default.createElement(
            'option',
            { value: opt.value, key: index },
            opt.text
          );
        })
      );
    }
  }]);

  return Dropdown;
}(_react.Component);

Dropdown.propTypes = {
  options: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    value: _react2.default.PropTypes.string.isRequired,
    text: _react2.default.PropTypes.string.isRequired
  })).isRequired,
  name: _react2.default.PropTypes.string.isRequired,
  className: _react2.default.PropTypes.string,
  invalidClassName: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.string,
  defaultOptionVisible: _react2.default.PropTypes.bool,
  defaultOptionText: _react2.default.PropTypes.string,
  onChange: _react2.default.PropTypes.func,
  validate: _react2.default.PropTypes.func,
  forceDirty: _react2.default.PropTypes.bool,
  resetValue: _react2.default.PropTypes.bool,
  inputIsValid: _react2.default.PropTypes.func
};

exports.default = (0, _reactClickOutside2.default)(Dropdown);
//# sourceMappingURL=dropdown.jsx.map
