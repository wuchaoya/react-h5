import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import TopicDetailsContainer from '../containers/TopicDetailsContainer';
import GameDetails from '../containers/GameDetailsContails';
import PlayGame from '../containers/PlayGameContainer';
const Base = () => (
  <Router>
    <div>
      <Route exact path='/' component={TopicDetailsContainer} />
      <Route exact path='/:gid' component={GameDetails} />
      <Route exact path='/playgame:time' component={PlayGame} />
    </div>
  </Router>
);

export default Base;
