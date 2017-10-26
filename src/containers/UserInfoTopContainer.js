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
        <UserIcon click={this.props.click} login={this.props.login} />
        <UserName name={this.props.name} login={this.props.login} />
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
