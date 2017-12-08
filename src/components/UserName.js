/**
 * Created by chao on 2017/10/23.
 */

import React, { Component } from 'react';

export default class UserName extends Component {
  render () {
    return (
      <span onClick={this.props.onClick} style={
        Object.assign(
          {},
          styles.textStyle,
          this.props.login ? styles.loginStyle : {}
        )
      }>{this.props.name}</span>
    );
  }
};

const styles = {
  textStyle: {
    color: '#fff',
    fontSize: '0.3rem',
    display: 'flex',
    justifyContent: 'center',
    marginTop:'0.1rem'
  },
  loginStyle: {
    position: 'absolute',
    left:'1.74rem',
    bottom: '1.06rem'
  }
};
