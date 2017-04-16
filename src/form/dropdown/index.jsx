import React from 'react';
import InputBaseComponent from '../inputBaseComponent';
import Dropdown from './dropdown';

/**
 * DropdownWrapper - params:
 * options: Array of { value: string, text: string }
 * value: value of selected option (string)
 * defaultOptionVisible: if true it will render a default option as the first option of the dropdown.
 * defaultOptionText: text of default option
 * onChange: function to be called when the user selects a new option of the dropdown.
*/
class DropdownWrapper extends InputBaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || ''
    };
  }

  componentWillReceiveProps({ forceDirty, serverValue }) {
    if (this.props.forceDirty != forceDirty && forceDirty) {
      this.props.validate(this.props.value);
    }
    if (this.props.serverValue !== serverValue) {
      this.props.onChange(serverValue);
      this.props.validate(serverValue);
    }
  }

  _onChange(value) {
    this.props.validate(value);
    this.setState({ value });
    this.props.onChange(value);
    this.props.onBlur(value);
  }

  render() {
    return (
      <div className={this.props.fieldClassName}>
        {this.renderLabel()}
        <Dropdown
          {...this.props}
          onChange={(value) => this._onChange(value)}
          inputIsValid={() => this.inputIsValid()}
        />
        {this.renderError()}
      </div>
    );
  }
}

DropdownWrapper.propTypes = {
  fieldClassName: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  validate: React.PropTypes.func
};

export default DropdownWrapper;
