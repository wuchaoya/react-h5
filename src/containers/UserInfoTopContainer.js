/**
 * Created by chao on 2017/10/23.
 */

import React, { Component } from 'react';

import UserIcon from '../components/UserIcon';
import UserName from '../components/UserName';
import UserTime from '../components/UserTime';
import icon from '../assets/icon-setting.png'

export default class UserInfoTop extends Component {
  render () {
    return (
      <div style={styles.container} >
        <UserIcon click={this.props.click} login={this.props.login} />
        <UserName name={this.props.name} login={this.props.login} />
        {this.props.login ? <UserTime time={this.props.time} login={this.props.login} /> : null}
        <div onClick={this.props.setting} style={styles.iconC}>
          <img style={styles.icon} src={icon} alt='' />
        </div>
      </div>
    );
  }
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  icon:{
    width:'0.6rem',
    height:'0.6rem'
  },
  iconC: {
    position: 'absolute',
    right:'0.12rem',
    top:'0.12rem'
  }
};
