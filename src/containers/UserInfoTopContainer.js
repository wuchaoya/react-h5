/**
 * Created by chao on 2017/10/23.
 */

import React, { Component } from 'react';

import UserIcon from '../components/UserIcon';
import UserName from '../components/UserName';
import UserTime from '../components/UserTime';
import icon from '../assets/icon-setting.png';
import goback from '../assets/back.png';

export default class UserInfoTop extends Component {
  render () {
    return (
      <div style={styles.container} >
        <UserIcon click={this.props.click} login={this.props.login} />
        <UserName name={this.props.name} login={this.props.login} />
        {this.props.login ? <UserTime time={this.props.time} login={this.props.login} /> : null}
        <div onClick={this.props.setting} style={styles.iconC}>
          <img style={styles.icon2} src={icon} alt='' />
        </div>
        <div onClick={this.props.goback} style={styles.goback}>
          <img style={styles.gobacksize} src={goback} alt='' />
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
    width:'0.5rem',
    height:'0.5rem'
  },
  icon2:{
    width:'0.4rem',
    height:'0.4rem'
  },
  iconC: {
    position: 'absolute',
    right:'0.3rem',
    top:'0.3rem'
  },
  goback: {
    position: 'absolute',
    left:'0rem',
    top:'0.24rem'
  },
  gobacksize: {
    width:'0.66rem',
    height:'0.66rem'
  }
};
