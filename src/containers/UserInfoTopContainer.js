/**
 * Created by chao on 2017/10/23.
 */

import React, { Component } from 'react';

import UserIcon from '../components/UserIcon';
import UserName from '../components/UserName';
import UserTime from '../components/UserTime';

export default class UserInfoTop extends Component {
  render () {
    return (
      <div style={styles.container} >
        <UserIcon login={this.props.login} />
        <UserName login={this.props.login} />
        {this.props.login ? <UserTime login={this.props.login} /> : null}
      </div>
    );
  }
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  }
};
