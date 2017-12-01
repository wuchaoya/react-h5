import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../containers/Home';
import Gamedetails from '../containers/GameDetails';
import Topic from '../containers/Topic';

class Base extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route exact path='/gamedetails' component={Gamedetails} />
          <Route exact path='/topic' component={Topic} />
        </div>
      </Router>
    );
  }
  componentWillMount () {
  }
}
export default connect()(Base);
