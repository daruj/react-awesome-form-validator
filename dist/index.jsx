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

    var validInputs = {};
    var inputValues = {};
    var defaultValues = {
      validInputs: {},
      inputValues: {}
    };
    var getInput = function getInput(child) {
      switch (child.type.name) {
        case 'Wrapper':
          getInput(child.props.children);
          break;
        case 'Input':
        case 'Dropdown':
          validInputs[child.props.name] = child.props.valid || false;
          inputValues[child.props.name] = child.props.value || '';
          defaultValues.validInputs[child.props.name] = child.props.valid || false;
          defaultValues.inputValues[child.props.name] = child.props.value || '';
          break;
        case 'CustomInput':
          var customInput = child.props.children;
          validInputs[customInput.props.name] = customInput.props.valid || false;
          inputValues[customInput.props.name] = customInput.props.value || '';
          defaultValues.validInputs[customInput.props.name] = customInput.props.valid || false;
          defaultValues.inputValues[customInput.props.name] = customInput.props.value || '';
          break;
      }
    };

    for (var x in _this.props.children) {
      getInput(_this.props.children[x]);
    }

    _this.state = {
      forceDirty: false,
      resetForm: false,
      validInputs: validInputs,
      inputValues: inputValues,
      defaultValues: defaultValues
    };
    return _this;
  }

  _createClass(Form, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var resetForm = _ref.resetForm;

      if (this.props.resetForm != resetForm && resetForm) {
        this.setState({ resetForm: true });
        this.resetForm();
        this.props.formWasResetted();
      }
    }
  }, {
    key: 'resetForm',
    value: function resetForm() {
      var validInputs = {};
      var inputValues = {};
      var defaultValues = _extends({}, this.state.defaultValues);

      for (var input in this.state.inputValues) {
        inputValues[input] = defaultValues.inputValues[input] || '';
        validInputs[input] = defaultValues.validInputs[input] || false;
      }
      this.setState(_extends({}, this.state, { resetForm: true, validInputs: validInputs, inputValues: inputValues }));
    }
  }, {
    key: 'getCommonMethods',
    value: function getCommonMethods(props) {
      var _this2 = this;

      var name = props.name,
          _validate = props.validate,
          _onChange = props.onChange;
      var _state = this.state,
          validInputs = _state.validInputs,
          inputValues = _state.inputValues,
          resetForm = _state.resetForm;

      return {
        resetValue: resetForm,
        valueWasResetted: function valueWasResetted() {
          return _this2.setState({ resetForm: false });
        },
        value: inputValues[name],
        valid: validInputs[name],
        forceDirty: this.state.forceDirty,
        onChange: function onChange(value) {
          var state = _extends({}, _this2.state);
          state.inputValues[name] = value;
          _this2.setState(state);
          if (_onChange) {
            _onChange(value);
          }
        },
        validate: function validate(value) {
          if (_validate) {
            var validateObj = _validate(value);
            var state = _extends({}, _this2.state);
            state.validInputs[name] = validateObj.valid;
            return validateObj;
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
              disabled: child.props.disabledUntilFormIsValidated ? (0, _lodash.some)(_this3.state.validInputs, function (x) {
                return !x;
              }) : false,
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
          case 'ResetButton':
            component = _react2.default.cloneElement(child, {
              onClick: function onClick(event) {
                event.preventDefault();
                _this3.resetForm();
                if (child.props.onClick) {
                  child.props.onClick();
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
        {
          className: this.props.className
        },
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
  className: _react2.default.PropTypes.string,
  resetForm: _react2.default.PropTypes.bool,
  formWasResetted: _react2.default.PropTypes.func
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

Form.Wrapper = _wrapper2.default;
Form.Wrapper.displayName = 'Wrapper';

exports.default = Form;
//# sourceMappingURL=index.jsx.map
