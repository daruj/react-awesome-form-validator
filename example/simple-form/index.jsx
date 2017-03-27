import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import SimpleForm from './simple-form';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('reactApplication')
  )
}

render(SimpleForm)

if (module.hot) {
  module.hot.accept('./simple-form', () => { render(SimpleForm) })
}
