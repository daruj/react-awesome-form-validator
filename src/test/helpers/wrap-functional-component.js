import React from 'react';
import PropTypes from 'prop-types';

// Cannot use ReactTestUtils for stateless functional components.
// https://github.com/facebook/react/issues/5901

class Wrapper extends React.Component {

  static get propTypes() {
    return {
      children: PropTypes.array.isRequired
    };
  }

  render() {
    return this.props.children;
  }

}


const WrapperFunctionalComponent = (Child, props) => {
  return React.createElement(Wrapper, {}, React.createElement(Child, props));
};

export default WrapperFunctionalComponent;
