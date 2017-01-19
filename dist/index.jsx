'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input2 = require('./input');

var _input3 = _interopRequireDefault(_input2);

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

    var inputs = {};

    var getInput = function getInput(child) {
      var getDefaultValues = function getDefaultValues(_ref) {
        var valid = _ref.valid,
            value = _ref.value;

        var defaults = {
          valid: valid || false,
          value: value || '',
          dirty: false,
          errorMessage: ''
        };
        return _extends({}, defaults, { defaults: defaults });
      };
      switch (child.type.name) {
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
        case 'DropdownWrapper':
          inputs[child.props.name] = getDefaultValues(child.props);break;
        case 'CustomInput':
          var customInput = child.props.children;
          inputs[customInput.props.name] = getDefaultValues(customInput.props);
          break;
      }
    };

    for (var x in _this.props.children) {
      getInput(_this.props.children[x]);
    }

    _this.state = { forceDirty: false, inputs: inputs };
    return _this;
  }

  _createClass(Form, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref2) {
      var resetForm = _ref2.resetForm;

      if (this.props.resetForm != resetForm && resetForm) {
        this.resetForm();
        this.props.formWasResetted();
      }
    }
  }, {
    key: 'resetForm',
    value: function resetForm() {
      var state = _extends({}, this.state);
      var inputs = state.inputs;
      for (var input in state.inputs) {
        var _state$inputs$input$d = this.state.inputs[input].defaults,
            valid = _state$inputs$input$d.valid,
            value = _state$inputs$input$d.value,
            dirty = _state$inputs$input$d.dirty;

        inputs[input] = _extends({}, this.state.inputs[input], { valid: valid, value: value, dirty: dirty });
      }
      this.setState({ state: state, forceDirty: false });
    }
  }, {
    key: 'getCommonMethods',
    value: function getCommonMethods(props) {
      var _this2 = this;

      var name = props.name,
          _validate = props.validate,
          _onChange = props.onChange;
      var _state = this.state,
          inputs = _state.inputs,
          forceDirty = _state.forceDirty;
      var _inputs$name = inputs[name],
          value = _inputs$name.value,
          valid = _inputs$name.valid,
          dirty = _inputs$name.dirty,
          errorMessage = _inputs$name.errorMessage;

      return {
        value: value, valid: valid, dirty: dirty, errorMessage: errorMessage, forceDirty: forceDirty,
        onChange: function onChange(value) {
          var state = _extends({}, _this2.state);
          state.inputs[name].value = value;
          _this2.setState(state);
          if (_onChange) {
            _onChange(value);
          }
        },
        validate: function validate(value) {
          var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          if (_validate) {
            var validateObj = _validate(value, extra);
            var state = _extends({}, _this2.state);
            state.inputs[name] = _extends({}, state.inputs[name], {
              valid: validateObj.valid,
              errorMessage: validateObj.errorMessage,
              dirty: true
            });
            _this2.setState({ state: state });
            return validateObj;
          } else {
            return { valid: true, errorMessage: '' };
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
              disabled: child.props.disabledUntilFormIsValidated ? (0, _lodash.some)(_this3.state.inputs, function (input) {
                return !input.valid;
              }) : false,
              onClick: function onClick(event) {
                event.preventDefault();
                var state = _extends({}, _this3.state);
                //check if all the inputs are valid
                if (!(0, _lodash.some)(state.inputs, function (input) {
                  return !input.valid;
                })) {
                  var inputs = {};
                  for (var input in state.inputs) {
                    inputs[input] = state.inputs[input].value;
                  }
                  // proceed with the flow
                  child.props.onClick(inputs);
                } else {
                  var _inputs = state.inputs;
                  for (var _input in _inputs) {
                    _inputs[_input] = _extends({}, _inputs[_input], { dirty: true });
                  }
                  _this3.setState(_extends({}, state, { forceDirty: true }));
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
          case 'DropdownWrapper':
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
  className: _react2.default.PropTypes.string,
  resetForm: _react2.default.PropTypes.bool,
  formWasResetted: _react2.default.PropTypes.func
};

Form.CustomInput = _customInput2.default;
Form.CustomInput.displayName = 'CustomInput';

Form.Input = _input3.default;
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
