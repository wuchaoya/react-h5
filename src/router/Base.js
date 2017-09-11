import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import TopicDetailsContainer from '../containers/TopicDetailsContainer';
import GameDetails from '../containers/GameDetailsContails';
const Base = () => (
  <Router>
    <div>
      <Route exact path='/' component={TopicDetailsContainer} />
      <Route exact path='/:gid' component={GameDetails} />
    </div>
  </Router>
);

export default Base;
