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

    var _this = _possibleConstructorReturn(this, (InputBaseComponent.__proto__ || Object.getPrototypeOf(InputBaseComponent)).call(this, props));

    _this.state = {
      valid: false,
      dirty: false
    };
    return _this;
  }

  _createClass(InputBaseComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var forceDirty = _ref.forceDirty;

      if (this.props.forceDirty != forceDirty && forceDirty) {
        var value = this.refs[this.props.name].value;
        var validateInput = this.props.validate(value);
        this.setState({
          dirty: true,
          valid: validateInput.valid,
          errorMessage: validateInput.errorMessage
        });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.state.valid != nextState.valid) {
        this.props.isValid(nextState.valid);
      }
    }
  }, {
    key: 'inputIsValid',
    value: function inputIsValid() {
      return this.state.valid || this.isPristine();
    }
  }, {
    key: 'isDirty',
    value: function isDirty() {
      return this.state.dirty;
    }
  }, {
    key: 'isPristine',
    value: function isPristine() {
      return !this.state.dirty;
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
  }]);

  return InputBaseComponent;
}(_react.Component);

InputBaseComponent.propTypes = {
  forceDirty: _react2.default.PropTypes.bool.isRequired,
  isValid: _react2.default.PropTypes.func.isRequired,
  name: _react2.default.PropTypes.string.isRequired,
  validate: _react2.default.PropTypes.func,
  label: _react2.default.PropTypes.string
};

exports.default = InputBaseComponent;
//# sourceMappingURL=inputBaseComponent.jsx.map