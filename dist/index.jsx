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

var _dropdown = require('./dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

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
      validInputs: {},
      inputValues: {}
    };
    return _this;
  }

  _createClass(Form, [{
    key: 'getCommonMethods',
    value: function getCommonMethods(props) {
      var _this2 = this;

      var name = props.name,
          _validate = props.validate;

      return {
        forceDirty: this.state.forceDirty,
        isValid: function isValid(valid) {
          var state = _extends({}, _this2.state);
          state.validInputs[name] = valid;
          _this2.setState(state);
        },
        setValidInputToUndefined: function setValidInputToUndefined() {
          var state = _extends({}, _this2.state);
          state.validInputs[name] = undefined;
          state.inputValues[name] = undefined;
          _this2.setState(state);
        },
        setInputValue: function setInputValue(value) {
          var state = _extends({}, _this2.state);
          state.inputValues[name] = value;
          _this2.setState(state);
        },
        validate: function validate(value) {
          if (_validate) {
            return _validate(value);
          } else {
            return {
              valid: true,
              errorMessage: ''
            };
          }
        }
      };
    }
  }, {
    key: 'getComponent',
    value: function getComponent(children) {
      var _this3 = this;

      return _react2.default.Children.map(children, function (child) {
        var component = child;
        switch (child.type.name) {
          case 'Wrapper':
            component = _react2.default.createElement(
              _wrapper2.default,
              child.props,
              _this3.getComponent(child.props.children)
            );
            break;
          case 'SubmitButton':
            component = _react2.default.cloneElement(child, {
              onClick: function onClick(event) {
                event.preventDefault();
                if (!(0, _lodash.some)(_this3.state.validInputs, function (x) {
                  return !x;
                })) {
                  child.props.onClick(_this3.state.inputValues);
                } else {
                  _this3.setState({ forceDirty: true });
                }
              }
            });
            break;
          case 'Input':
          case 'Dropdown':
            component = _react2.default.cloneElement(child, _this3.getCommonMethods(child.props));
            break;
          case 'CustomInput':
            var customInput = child.props.children;
            component = _react2.default.cloneElement(customInput, _this3.getCommonMethods(customInput.props));
            break;
        }
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

Form.Dropdown = _dropdown2.default;
Form.Dropdown.displayName = 'Dropdown';

Form.SubmitButton = _submitButton2.default;
Form.SubmitButton.displayName = 'SubmitButton';

Form.Wrapper = _wrapper2.default;
Form.Wrapper.displayName = 'Wrapper';

exports.default = Form;
//# sourceMappingURL=index.jsx.map
