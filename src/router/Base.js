import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import TopicDetailsContainer from '../containers/TopicDetailsContainer';
import GameDetails from '../containers/GameDetailsContails';
import PlayGame from '../containers/PlayGameContainer';
import Pull from '../containers/GameListContainer';
import Home from '../containers/HomeContainer';
import MGPlay from '../containers/MGPlay';
const Base = () => (
  <Router>
    <div>
      <Route exact path='/' component={TopicDetailsContainer} />
      <Route exact path='/gamedetails:gid' component={GameDetails} />
      <Route exact path='/playgame' component={PlayGame} />
      <Route exact path='/gamelist' component={Pull} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/mg' component={MGPlay} />
    </div>
  </Router>
);

export default Base;
