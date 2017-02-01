import React from 'React';
import { Router, createMemoryHistory }  from 'react-router';
import { Provider } from 'react-redux';

// See https://github.com/ReactTraining/react-router/issues/465
export default function mockRoutes(routes, store, path) {
  const history = createMemoryHistory(path);
  const app = React.createElement(Provider, {
    store
  }, React.createElement(Router, {
    history,
    routes
  }));
  return { app, history };
}
