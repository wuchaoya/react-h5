import React from 'react';
import { render } from 'react-dom';

import Base from './router/Base';
import registerServiceWorker from './registerServiceWorker';

render(
  <Base />,
  document.getElementById('root')
);

registerServiceWorker();
