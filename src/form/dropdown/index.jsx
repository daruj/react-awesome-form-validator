import React from 'react';
import InputBaseComponent from '../inputBaseComponent';
import classnames from 'classnames';
import styles from './styles.scss';

/**
 * Dropdown - params:
 * options: Array of { value: string, text: string }
 * value: value of selected option (string)
 * defaultOptionVisible: if true it will render a default option as the first option of the dropdown.
 * defaultOptionText: text of default option
 * onChange: function to be called when the user selects a new option of the dropdown.
*/
class Dropdown extends InputBaseComponent {
  constructor(props) {
    super(props);

    const { value, defaultOptionVisible } = this.props;

    const defaultOption =
      (defaultOptionVisible == undefined || defaultOptionVisible) &&
      (!value || value == '');


    this.state = {
      defaultOptionVisible: defaultOption
    };
  }

  componentWillReceiveProps(nextProps) {
    const { forceDirty, resetValue } = nextProps;
    if (this.props.forceDirty != forceDirty && forceDirty) {
      const value = this.refs[this.props.name].value;
      const validateInput = this.props.validate(value);
      this.setState({
        dirty: true,
        valid: validateInput.valid,
        errorMessage: validateInput.errorMessage
      });
    }

    if (this.props.resetValue != resetValue && resetValue) {
      const { value, defaultOptionVisible } = nextProps;
      const defaultOption =
        (defaultOptionVisible == undefined || defaultOptionVisible) &&
        (!value || value == '');
      this.setState({
        defaultOptionVisible: defaultOption,
        dirty: false
      });
      this.props.valueWasResetted();
    }
  }

  _onChange(value) {
    const {
      onChange,
      validate = () => true,
      setInputValue
    } = this.props;
    const validateInput = validate(value);
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

  renderDefaultOption() {
    if (this.state.defaultOptionVisible) {
      return (
        <option value=''>{this.props.defaultOptionText || 'Select'}</option>
      );
    }
  }
  render() {
    const {
      options,
      value,
      fieldClassName = styles.wrapperField,
      name,
      invalidClassName = styles.invalidField,
      className = styles.dropdown
    } = this.props;

    return (
      <div className={fieldClassName}>
        {this.renderLabel()}
        <select
          onChange={(event) => this._onChange(event.target.value)}
          value={value}
          ref={name}
          name={name}
          className={
            classnames(
              !this.inputIsValid() ? invalidClassName : '',
              className
            )
          }
        >
          {this.renderDefaultOption()}
          {options.map((opt, index) => {
            return (
              <option value={opt.value} key={index}>{opt.text}</option>
            );
          })}
        </select>
        {this.renderError()}
      </div>
    );
  }
}

Dropdown.propTypes = {
  fieldClassName: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    value: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired
  })).isRequired,
  name: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  invalidClassName: React.PropTypes.string,
  value: React.PropTypes.string,
  defaultOptionVisible: React.PropTypes.bool,
  defaultOptionText: React.PropTypes.string,
  onChange: React.PropTypes.func,
  validate: React.PropTypes.func,
  setValidInputToUndefined: React.PropTypes.func,
  setInputValue: React.PropTypes.func
};

export default Dropdown;
