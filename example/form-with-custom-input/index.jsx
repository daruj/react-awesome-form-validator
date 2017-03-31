import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import FormWithCustomInput from './form-with-custom-input';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('reactApplication')
  )
}

render(FormWithCustomInput)

if (module.hot) {
  module.hot.accept('./form-with-custom-input', () => { render(FormWithCustomInput) })
}
