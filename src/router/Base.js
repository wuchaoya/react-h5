import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import TopicDetailsContainer from '../containers/TopicDetailsContainer';
const Base = () => (
  <Router>
    <div>
      <Route exact path='/' component={TopicDetailsContainer} />
    </div>
  </Router>
);

export default Base;
