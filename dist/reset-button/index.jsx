'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResetButton = function (_Component) {
  _inherits(ResetButton, _Component);

  function ResetButton(props) {
    _classCallCheck(this, ResetButton);

    return _possibleConstructorReturn(this, (ResetButton.__proto__ || Object.getPrototypeOf(ResetButton)).call(this, props));
  }

  _createClass(ResetButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$children = _props.children,
          children = _props$children === undefined ? 'Reset Form' : _props$children,
          _props$disabled = _props.disabled,
          disabled = _props$disabled === undefined ? false : _props$disabled,
          _props$fieldClassName = _props.fieldClassName,
          fieldClassName = _props$fieldClassName === undefined ? _styles2.default.wrapperField : _props$fieldClassName,
          _props$className = _props.className,
          className = _props$className === undefined ? _styles2.default.button : _props$className,
          onClick = _props.onClick;

      return _react2.default.createElement(
        'div',
        {
          className: fieldClassName
        },
        _react2.default.createElement(
          'button',
          {
            disabled: disabled,
            className: className,
            onClick: onClick
          },
          children
        )
      );
    }
  }]);

  return ResetButton;
}(_react.Component);

ResetButton.propTypes = {
  children: _react2.default.PropTypes.string.isRequired,
  fieldClassName: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  onClick: _react2.default.PropTypes.func,
  disabled: _react2.default.PropTypes.bool
};

exports.default = ResetButton;
//# sourceMappingURL=index.jsx.map
