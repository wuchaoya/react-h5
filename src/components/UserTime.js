/**
 * Created by chao on 2017/10/23.
 */

import React, { Component } from 'react';

export default class UserTime extends Component {
  render () {
    return (
      <div style={Object.assign(
        {},
        styles.container,
        this.props.login ? styles.loginStyle : {}
      )}>
        <span style={styles.textStyle} >剩余时间：</span>
        <span style={styles.numberStyle} >102</span>
        <span style={styles.textStyle} >小时</span>
        <span style={styles.numberStyle} >22</span>
        <span style={styles.textStyle} >分钟</span>
      </div>
    );
  }
};

const styles = {
  container: {
    display:'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems:'center'
  },
  textStyle: {
    fontSize:'0.24rem',
    color: '#fff'
  },
  numberStyle: {
    fontSize: '0.3rem',
    color: '#ff8800'
  },
  loginStyle: {
    position: 'absolute',
    left:'1.74rem',
    bottom: '0.52rem'
  }
};
