import React from 'react';
import InputBaseComponent from '../inputBaseComponent';
import classnames from 'classnames';
import styles from './styles.scss';

class MultipleInputs extends InputBaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      goals: this.props.goals || []
    }
  }

  componentDidMount() {
    if (this.state.goals.length) {
      const goals = this.state.goals;
      this.props.onChange(JSON.stringify(goals));
      this.props.validate(JSON.stringify(goals));
    }
  }


  _addNewGoal() {
    const state = { ...this.state };
    state.goals.push('');
    this.setState(state);
    this.props.onChange(JSON.stringify(state.goals));
    this.props.validate(JSON.stringify(state.goals));
  }

  _updateValue(index, value) {
    const state = { ...this.state };
    state.goals[index] = value;
    this.setState(state);
    this.props.onChange(JSON.stringify(state.goals));
    this.props.validate(JSON.stringify(state.goals));
  }

  render() {
    const {
      fieldClassName = styles.wrapperField,
      placeHolder = '',
      name,
      className = styles.input,
      invalidClassName = styles.invalidField,
      value,
      startValidatingWhenIsPristine = false,
      disabled
    } = this.props;
    return (
      <div className={fieldClassName}>
        <button onClick={(evt) => {
          evt.preventDefault();
          this._addNewGoal();
        }}>Add new Goal</button>
        {this.renderLabel()}
        {
          this.state.goals.map((goal, index) => (
            <div key={index}>
              <label>Enter your goal {index}</label>
              <input
                type='text'
                value={this.state.goals[index]}
                onChange={(evt) => {
                  const value = evt.target.value;
                  this._updateValue(index, value);
                }}
              />
            </div>
          ))
        }
        {this.renderError()}
        <input type='hidden' name={name} value={value} ref={name} />
      </div>
    );
  }
}

MultipleInputs.propTypes = {
  fieldClassName: React.PropTypes.string,
  placeHolder: React.PropTypes.string,
  label: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  className: React.PropTypes.string,
  invalidClassName: React.PropTypes.string,
  validate: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  startValidatingWhenIsPristine: React.PropTypes.bool,
  disabled: React.PropTypes.bool
};

export default MultipleInputs;
