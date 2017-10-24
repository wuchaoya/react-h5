import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';

import TopicDetailsContainer from '../containers/TopicDetailsContainer';
import GameDetails from '../containers/GameDetailsContails';
import PlayGame from '../containers/PlayGameContainer';
import Pull from '../containers/GameListContainer';
import Home from '../containers/HomeContainer';
import MGPlay from '../containers/MGPlay';
import User from '../containers/UserContainer';

class Base extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/home' component={Home} />
          <Route exact path='/topic' component={TopicDetailsContainer} />
          <Route exact path='/gamedetails:gid' component={GameDetails} />
          <Route exact path='/playgame' component={PlayGame} />
          <Route exact path='/gamelist' component={Pull} />
          <Route exact path='/mg' component={MGPlay} />
          <Route exact path='/user' component={User} />
        </div>
      </Router>
    );
  }
  componentWillMount () {
    console.log(this);
  }
}
export default connect()(Base);