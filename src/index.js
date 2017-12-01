import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import reducer from './reducers';
import Base from './router/Base';
import finalCreateStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = finalCreateStore(reducer);
render(
  <Provider store={store}>
    <Base />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
