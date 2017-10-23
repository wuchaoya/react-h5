/**
 * Created by chao on 2017/10/23.
 */

import React, { Component } from 'react';

export default class UserName extends Component {
  render () {
    return (
      <span style={
        Object.assign(
          {},
          styles.textStyle,
          this.props.login ? styles.loginStyle : {}
        )
      }>{this.props.login ? '10086' : '未登录'}</span>
    );
  }
};

const styles = {
  textStyle: {
    color: '#fff',
    fontSize: '0.3rem',
    display: 'flex',
    justifyContent: 'center',
    marginTop:'0.18rem'
  },
  loginStyle: {
    position: 'absolute',
    left:'1.74rem',
    bottom: '1.06rem'
  }
};
