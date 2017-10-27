/**
 * Created by chao on 2017/10/23.
 */

import React, { Component } from 'react';

export default class UserTime extends Component {
  render () {
    console.log(this.props);
    return (
      <div style={Object.assign(
        {},
        styles.container,
        this.props.login ? styles.loginStyle : {}
      )}>
        <span style={styles.textStyle} >剩余时间：</span>
        {
          this.props.time === null ? <span style={styles.textStyle} >正在获取...</span> : <span>
          <span style={styles.numberStyle} >
            {parseInt(this.props.time / 1000 / 60 / 60 < 0 ? 0 : this.props.time / 1000 / 60 / 60)}
          </span>
          <span style={styles.textStyle} >小时</span>
          <span style={styles.numberStyle} >
            {parseInt(this.props.time / 1000 / 60 % 60) < 0 ? 0 : parseInt(this.props.time / 1000 / 60 % 60)}
          </span>
          <span style={styles.textStyle} >分钟</span>
        </span>
        }
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
