import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Home,
	GameDetails,
	Topic,
  User,
  GameList,
	Activity,
	PlayGame,
	ChessCardGame,
	QPCloudPlay,
	Setting,
	SignIn,
	SignInSMS
} from '../containers';

class Base extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route exact path='/gamedetails' component={GameDetails} />
          <Route exact path='/topic' component={Topic} />
          <Route exact path='/user' component={User} />
          <Route exact path='/gamelist' component={GameList} />
          <Route exact path='/playGame' component={PlayGame} />
          <Route exact path='/QPCloudPlay' component={QPCloudPlay} />
          <Route exact path='/chessCardGame' component={ChessCardGame} />
          <Route exact path='/activity' component={Activity} />
          <Route exact path='/setting' component={Setting} />
          <Route exact path='/signIn' component={SignIn} />
          <Route exact path='/signInSMS' component={SignInSMS} />
        </div>
      </Router>
    );
  }
  componentWillMount () {
  }
}
export default connect()(Base);
