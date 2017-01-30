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

var _resetButton = require('./reset-button');

var _resetButton2 = _interopRequireDefault(_resetButton);

var _wrapper = require('./wrapper');

var _wrapper2 = _interopRequireDefault(_wrapper);

var _customInput = require('./custom-input');

var _customInput2 = _interopRequireDefault(_customInput);

var _customResetButton = require('./custom-reset-button');

var _customResetButton2 = _interopRequireDefault(_customResetButton);

var _customSubmitButton = require('./custom-submit-button');

var _customSubmitButton2 = _interopRequireDefault(_customSubmitButton);

var _emptySpan = require('./empty-span');

var _emptySpan2 = _interopRequireDefault(_emptySpan);

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

    var inputs = {};

    var getInput = function getInput(child) {
      var getDefaultValues = function getDefaultValues(_ref) {
        var valid = _ref.valid,
            value = _ref.value,
            validate = _ref.validate,
            _ref$disabled = _ref.disabled,
            disabled = _ref$disabled === undefined ? false : _ref$disabled;

        // default values
        var defaults = {
          valid: !validate,
          value: '',
          dirty: false,
          errorMessage: ''
        };
        if (value) {
          if (validate) {
            // default values when the input has a value and a validate prop
            var validateObj = validate(value);
            defaults = {
              value: value,
              valid: validateObj.valid,
              errorMessage: validateObj.errorMessage,
              dirty: true
            };
          } else {
            // default values when the input has a value but has not a validate prop
            defaults = {
              valid: true,
              value: value,
              dirty: true,
              errorMessage: ''
            };
          }
        }

        return _extends({}, defaults, { defaults: defaults, resetValue: false, disabled: disabled, needToValidate: validate });
      };

      var displayName = child.props ? child.type.displayName : '';

      switch (displayName) {
        case 'Wrapper':
          if (child.props.children) {
            if (child.props.children.length) {
              for (var x in child.props.children) {
                getInput(child.props.children[x]);
              }
            } else {
              getInput(child.props.children);
            }
          }
          break;
        case 'Input':
        case 'Dropdown':
          inputs[child.props.name] = getDefaultValues(child.props);break;
        case 'CustomInput':
          var customInput = child.props.children;
          inputs[customInput.props.name] = getDefaultValues(customInput.props);
          break;
      }
    };

    var formElements = _this.props.children;
    for (var x in formElements) {
      if (_this.props.children.length) {
        getInput(_this.props.children[x]);
      } else {
        getInput(_this.props.children);
      }
    }
    _this.state = { forceDirty: false, inputs: inputs };
    return _this;
  }

  _createClass(Form, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref2) {
      var resetForm = _ref2.resetForm,
          disableInputs = _ref2.disableInputs,
          clearValuesOnReset = _ref2.clearValuesOnReset,
          serverErrors = _ref2.serverErrors;

      if (this.props.resetForm != resetForm && resetForm) {
        this.resetForm({ clearValues: clearValuesOnReset });
        this.props.formWasResetted();
      }

      if (this.props.disableInputs != disableInputs) {
        this.setInputsValues({ disabled: disableInputs });
      }

      if (this.props.serverErrors != serverErrors && Object.keys(serverErrors).length) {
        this.setBackendErrors(serverErrors);
      }
    }
  }, {
    key: 'setBackendErrors',
    value: function setBackendErrors() {
      var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var state = _extends({}, this.state);
      var inputs = state.inputs;
      for (var input in errors) {
        inputs[input] = _extends({}, state.inputs[input], {
          valid: false,
          errorMessage: errors[input]
        });
      }
      this.setState({ state: state });
    }
  }, {
    key: 'resetForm',
    value: function resetForm(_ref3) {
      var clearValues = _ref3.clearValues;

      var state = _extends({}, this.state);
      var inputs = state.inputs;
      for (var input in state.inputs) {
        var _state$inputs$input$d = state.inputs[input].defaults,
            valid = _state$inputs$input$d.valid,
            value = _state$inputs$input$d.value,
            dirty = _state$inputs$input$d.dirty;

        inputs[input] = _extends({}, state.inputs[input], {
          resetValue: true,
          valid: clearValues ? !state.inputs[input].needToValidate : valid,
          dirty: clearValues ? false : dirty,
          value: clearValues ? '' : value
        });
      }
      this.setState({ state: state, forceDirty: false });
    }
  }, {
    key: 'getResetButtonProps',
    value: function getResetButtonProps(props) {
      var _this2 = this;

      return {
        disabled: this.props.disableInputs,
        onClick: function onClick(event) {
          event.preventDefault();
          _this2.resetForm({ clearValues: props.clearValues });
          // proceed to call the onReset prop from the Form.
          if (_this2.props.onReset) {
            _this2.props.onReset();
          }
        }
      };
    }
  }, {
    key: 'getSubmitButtonProps',
    value: function getSubmitButtonProps(props) {
      var _this3 = this;

      return {
        disabled: this.props.disableInputs || (props.disabledUntilFormIsValidated ? (0, _lodash.some)(this.state.inputs, function (input) {
          return !input.valid;
        }) : false),
        onClick: function onClick(event) {
          event.preventDefault();
          //check if all the inputs are valid
          if (!(0, _lodash.some)(_this3.state.inputs, function (input) {
            return !input.valid;
          })) {
            // proceed to call the onSubmit prop from the Form.
            _this3.props.onSubmit(_extends({}, _this3.getInputsAndTheirValues()));
          } else {
            _this3.setInputsValues({ dirty: true });
            _this3.setState({ forceDirty: true });
          }
        }
      };
    }
  }, {
    key: 'getInputsAndTheirValues',
    value: function getInputsAndTheirValues() {
      var inputs = {};
      for (var input in this.state.inputs) {
        inputs[input] = this.state.inputs[input].value;
      }
      return inputs;
    }
  }, {
    key: 'setInputsValues',
    value: function setInputsValues(newValues) {
      var state = _extends({}, this.state);
      var inputs = state.inputs;
      for (var input in state.inputs) {
        inputs[input] = _extends({}, state.inputs[input], newValues);
      }
      this.setState({ state: state });
    }
  }, {
    key: 'setInputValues',
    value: function setInputValues(inputName, newValues) {
      var state = _extends({}, this.state);
      state.inputs[inputName] = _extends({}, state.inputs[inputName], newValues);
      this.setState({ state: state });
    }
  }, {
    key: 'getInputsCommonProps',
    value: function getInputsCommonProps(props) {
      var _this4 = this;

      var name = props.name,
          _validate = props.validate,
          _onChange = props.onChange;

      var input = name;
      var _state = this.state,
          inputs = _state.inputs,
          forceDirty = _state.forceDirty;
      var _inputs$input = inputs[input],
          value = _inputs$input.value,
          valid = _inputs$input.valid,
          dirty = _inputs$input.dirty,
          errorMessage = _inputs$input.errorMessage,
          resetValue = _inputs$input.resetValue,
          disabled = _inputs$input.disabled;

      return {
        value: value, valid: valid, dirty: dirty, errorMessage: errorMessage, forceDirty: forceDirty, resetValue: resetValue, disabled: disabled,
        onChange: function onChange(value) {
          _this4.setInputValues(input, { value: value });
          if (_onChange) {
            _onChange(value);
          }
        },
        validate: function validate(value) {
          var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          if (_validate) {
            var validateObj = _validate(value, extra);
            _this4.setInputValues(input, {
              valid: validateObj.valid,
              errorMessage: validateObj.errorMessage,
              dirty: true
            });
          } else {
            _this4.setInputValues(input, {
              valid: true,
              errorMessage: '',
              dirty: true
            });
          }
        },
        valueWasResetted: function valueWasResetted() {
          _this4.setInputValues(input, { resetValue: false });
        }
      };
    }
  }, {
    key: 'getChildrenComponents',
    value: function getChildrenComponents(children) {
      var _this5 = this;

      return _react2.default.Children.map(children, function (child) {
        var component = child;
        var displayName = child.props ? child.type.displayName : '';
        switch (displayName) {
          case 'Wrapper':
            component = _react2.default.createElement(
              _wrapper2.default,
              child.props,
              _this5.getChildrenComponents(child.props.children)
            );
            break;
          case 'SubmitButton':
            component = _react2.default.cloneElement(child, _this5.getSubmitButtonProps(child.props));
            break;
          case 'ResetButton':
            component = _react2.default.cloneElement(child, _this5.getResetButtonProps(child.props));
            break;
          case 'Input':
          case 'Dropdown':
            component = _react2.default.cloneElement(child, _this5.getInputsCommonProps(child.props));
            break;
          case 'CustomInput':
            var customInput = child.props.children;
            component = _react2.default.cloneElement(customInput, _this5.getInputsCommonProps(customInput.props));
            break;
          case 'CustomSubmitButton':
            var customSubmitButton = child.props.children.props ? child.props.children : (0, _emptySpan2.default)({ children: child.props.children });
            component = _react2.default.cloneElement(customSubmitButton, _this5.getSubmitButtonProps(child.props));
            break;
          case 'CustomResetButton':
            var customResetButton = child.props.children.props ? child.props.children : (0, _emptySpan2.default)({ children: child.props.children });
            component = _react2.default.cloneElement(customResetButton, _this5.getResetButtonProps(child.props));
            break;
        }
        return component;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { className: this.props.className },
        this.getChildrenComponents(this.props.children)
      );
    }
  }]);

  return Form;
}(_react.Component);

Form.propTypes = {
  children: _react.PropTypes.node
};


Form.propTypes = {
  className: _react2.default.PropTypes.string,
  resetForm: _react2.default.PropTypes.bool,
  clearValuesOnReset: _react2.default.PropTypes.bool,
  formWasResetted: _react2.default.PropTypes.func,
  onSubmit: _react2.default.PropTypes.func.isRequired,
  onReset: _react2.default.PropTypes.func,
  disableInputs: _react2.default.PropTypes.bool,
  serverErrors: _react2.default.PropTypes.shape({})
};

Form.CustomInput = _customInput2.default;
Form.CustomInput.displayName = 'CustomInput';

Form.Input = _input2.default;
Form.Input.displayName = 'Input';

Form.Dropdown = _dropdown2.default;
Form.Dropdown.displayName = 'Dropdown';

Form.SubmitButton = _submitButton2.default;
Form.SubmitButton.displayName = 'SubmitButton';

Form.ResetButton = _resetButton2.default;
Form.ResetButton.displayName = 'ResetButton';

Form.CustomSubmitButton = _customSubmitButton2.default;
Form.CustomSubmitButton.displayName = 'CustomSubmitButton';

Form.CustomResetButton = _customResetButton2.default;
Form.CustomResetButton.displayName = 'CustomResetButton';

Form.Wrapper = _wrapper2.default;
Form.Wrapper.displayName = 'Wrapper';

exports.default = Form;
//# sourceMappingURL=index.jsx.map
