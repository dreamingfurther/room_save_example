import React from 'react';
import { render } from 'react-dom';
import AppContainer from './AppContainer';
import { Provider } from 'react-redux';
import store from './store';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const ConnectedApp = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

render(<ConnectedApp />, document.getElementById('root'));
