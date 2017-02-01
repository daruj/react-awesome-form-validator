import React, { Component }    from 'react';
import ReactDOM                from 'react-dom';
import SimpleForm              from './simple-form';

class Root extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SimpleForm />
    );
  }
}


ReactDOM.render(<Root/>, document.getElementById('reactApplication'));
