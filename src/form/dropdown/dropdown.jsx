import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import enhanceWithClickOutside from 'react-click-outside';

/**
 * Dropdown - params:
 * options: Array of { value: string, text: string }
 * value: value of selected option (string)
 * defaultOptionVisible: if true it will render a default option as the first option of the dropdown.
 * defaultOptionText: text of default option
 * onChange: function to be called when the user selects a new option of the dropdown.
*/
class Dropdown extends Component {
  constructor(props) {
    super(props);

    const { value, defaultOptionVisible } = this.props;

    const defaultOption =
      (defaultOptionVisible == undefined || defaultOptionVisible) &&
      (!value || value == '');


    this.state = {
      defaultOptionVisible: defaultOption,
      isOpened: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { resetValue } = nextProps;

    if (this.props.resetValue != resetValue && resetValue) {
      const { value, defaultOptionVisible } = nextProps;
      const defaultOption =
        (defaultOptionVisible == undefined || defaultOptionVisible) &&
        (!value || value == '');
      this.setState({ defaultOptionVisible: defaultOption });
    }
  }

  _onChange(value) {
    if (value !== '') {
      this.setState({ defaultOptionVisible: false });
    }
    this.props.onChange(value);
  }

  handleClickOutside() {
    if (this.state.isOpened) {
      this.props.onChange(this.refs[this.props.name].value);
      this.setState({ isOpened: false });
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
      name,
      invalidClassName = styles.invalidField,
      className = styles.dropdown,
      inputIsValid
    } = this.props;

    return (
      <select
        onChange={(event) => this._onChange(event.target.value)}
        onClick={() => this.setState({ isOpened: true })}
        onKeyDown={(event) => {
          if (event.which == 9) {
            this._onChange(event.target.value);
          }
        }}
        onFocus={() => this.setState({ isOpened: true })}
        value={value}
        ref={name}
        name={name}
        className={
          classnames(
            !inputIsValid() ? invalidClassName : '',
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
    );
  }
}

Dropdown.propTypes = {
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
  forceDirty: React.PropTypes.bool,
  resetValue: React.PropTypes.bool,
  inputIsValid: React.PropTypes.func
};

export default enhanceWithClickOutside(Dropdown);
