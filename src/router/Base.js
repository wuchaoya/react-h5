import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import TopicDetailsContainer from '../containers/TopicDetailsContainer';
import GameDetails from '../containers/GameDetailsContails';
import PlayGame from '../containers/PlayGameContainer';
import Pull from '../containers/GameListContainer';
const Base = () => (
  <Router>
    <div>
      <Route exact path='/' component={TopicDetailsContainer} />
      <Route exact path='/gamedetails:gid' component={GameDetails} />
      <Route exact path='/playgame' component={PlayGame} />
      <Route exact path='/gamelist' component={Pull} />
    </div>
  </Router>
);

export default Base;
