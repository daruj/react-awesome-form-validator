'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputBaseComponent = function (_Component) {
  _inherits(InputBaseComponent, _Component);

  function InputBaseComponent(props) {
    _classCallCheck(this, InputBaseComponent);

    return _possibleConstructorReturn(this, (InputBaseComponent.__proto__ || Object.getPrototypeOf(InputBaseComponent)).call(this, props));
  }

  _createClass(InputBaseComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var forceDirty = _ref.forceDirty,
          resetValue = _ref.resetValue,
          valueWasResetted = _ref.valueWasResetted;

      if (this.props.forceDirty != forceDirty && forceDirty) {
        var value = this.refs[this.props.name].value;
        this.props.validate(value);
      }

      if (this.props.resetValue != resetValue && resetValue) {
        // do something
        valueWasResetted();
      }
    }
  }, {
    key: 'inputIsValid',
    value: function inputIsValid() {
      return this.props.valid || this.isPristine();
    }
  }, {
    key: 'isDirty',
    value: function isDirty() {
      return this.props.dirty;
    }
  }, {
    key: 'isPristine',
    value: function isPristine() {
      return !this.props.dirty;
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
    key: 'renderError',
    value: function renderError() {
      if (this.props.errorMessage && !this.isPristine() && !this.props.valid) {
        return _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'span',
            null,
            this.props.errorMessage
          )
        );
      }
    }
  }]);

  return InputBaseComponent;
}(_react.Component);

InputBaseComponent.propTypes = {
  forceDirty: _react2.default.PropTypes.bool.isRequired,
  name: _react2.default.PropTypes.string.isRequired,
  validate: _react2.default.PropTypes.func,
  label: _react2.default.PropTypes.string,
  valid: _react2.default.PropTypes.bool,
  dirty: _react2.default.PropTypes.bool,
  errorMessage: _react2.default.PropTypes.string,
  resetValue: _react2.default.PropTypes.bool
};

exports.default = InputBaseComponent;
//# sourceMappingURL=inputBaseComponent.jsx.map
