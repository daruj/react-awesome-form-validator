'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _submitButton = require('./submit-button');

var _submitButton2 = _interopRequireDefault(_submitButton);

var _wrapper = require('./wrapper');

var _wrapper2 = _interopRequireDefault(_wrapper);

var _customInput = require('./custom-input');

var _customInput2 = _interopRequireDefault(_customInput);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.state = {
      forceDirty: false,
      validInputs: {}
    };
    return _this;
  }

  _createClass(Form, [{
    key: 'getComponent',
    value: function getComponent(children) {
      var _this2 = this;

      return _react2.default.Children.map(children, function (child) {
        var component = child;

        (function () {
          switch (child.type.name) {
            case 'Wrapper':
              component = _react2.default.createElement(
                _wrapper2.default,
                child.props,
                _this2.getComponent(child.props.children)
              );
              break;
            case 'SubmitButton':
              component = _react2.default.cloneElement(child, {
                onClick: function onClick(event) {
                  event.preventDefault();
                  if (!(0, _lodash.some)(_this2.state.validInputs, function (x) {
                    return !x;
                  })) {
                    child.props.onClick();
                  } else {
                    _this2.setState({ forceDirty: true });
                  }
                }
              });
              break;
            case 'Input':
              component = _react2.default.cloneElement(child, {
                forceDirty: _this2.state.forceDirty,
                isValid: function isValid(valid) {
                  var state = _extends({}, _this2.state);
                  state.validInputs[child.props.name] = valid;
                  _this2.setState(state);
                },
                setValidInputToUndefined: function setValidInputToUndefined() {
                  var state = _extends({}, _this2.state);
                  state.validInputs[child.props.name] = undefined;
                  _this2.setState(state);
                },
                validate: function validate(value) {
                  if (child.props.validate) {
                    return child.props.validate(value);
                  } else {
                    return {
                      valid: true,
                      errorMessage: ''
                    };
                  }
                }
              });
              break;
            case 'CustomInput':
              var customInput = child.props.children;
              component = _react2.default.cloneElement(customInput, {
                forceDirty: _this2.state.forceDirty,
                isValid: function isValid(valid) {
                  var state = _extends({}, _this2.state);
                  state.validInputs[customInput.props.name] = valid;
                  _this2.setState(state);
                },
                setValidInputToUndefined: function setValidInputToUndefined() {
                  var state = _extends({}, _this2.state);
                  state.validInputs[customInput.props.name] = undefined;
                  _this2.setState(state);
                },
                validate: function validate(value) {
                  if (customInput.props.validate) {
                    return customInput.props.validate(value);
                  } else {
                    return {
                      valid: true,
                      errorMessage: ''
                    };
                  }
                }
              });
              break;
          }
        })();

        return component;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var childrenWithProps = this.getComponent(this.props.children);
      return _react2.default.createElement(
        'form',
        { className: this.props.className },
        childrenWithProps
      );
    }
  }]);

  return Form;
}(_react.Component);

Form.propTypes = {
  children: _react.PropTypes.node
};


Form.propTypes = {
  className: _react2.default.PropTypes.string
};

Form.CustomInput = _customInput2.default;
Form.CustomInput.displayName = 'CustomInput';

Form.Input = _input2.default;
Form.Input.displayName = 'Input';

Form.SubmitButton = _submitButton2.default;
Form.SubmitButton.displayName = 'SubmitButton';

Form.Wrapper = _wrapper2.default;
Form.Wrapper.displayName = 'Wrapper';

exports.default = Form;
//# sourceMappingURL=index.jsx.map
