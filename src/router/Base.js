import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import TopicDetailsContainer from '../containers/TopicDetailsContainer';
import GameDetails from '../containers/GameDetailsContails';
import PlayGame from '../containers/PlayGameContainer';
import Pull from '../containers/GameListContainer';
import Home from '../containers/HomeContainer';
import MGPlay from '../containers/MGPlay';
import Test from '../containers/Test';
import WeChatAuthorize from '../containers/WeChatAuthorize';
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    window.localStorage.getItem('isLogin');
    if (window.isLogin) {
      return <Component {...props} />;
    } else {
      window.isLogin = true;
      return <Redirect to={{
        pathname: '/authorize',
        state: { from: props.location }
      }} />;
    }
  }
  } />
);
export default class Base extends Component {
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
          <Route exact path='/test' component={Test} />
          <Route exact path='/authorize' component={WeChatAuthorize} />
        </div>
      </Router>
    );
  }
  componentWillMount () {
    console.log(this);
  }
}
