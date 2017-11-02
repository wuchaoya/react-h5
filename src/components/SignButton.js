/**
 * Created by chao on 2017/10/24.
 */

import React, { Component } from 'react';

export default class SignButton extends Component {
  render () {
    return (
      <div
        style={Object.assign(
        {}, styles.container, this.props.disabled ? styles.disabledTrue : styles.disabledFalse)}
        onClick={() => {
          if (!this.props.disabled) {
            this.props.onClick();
          }
        }}
      >
        <span style={styles.textStyle}>登陆</span>
      </div>
    );
  }
};

const styles = {
  container: {
    display: 'flex',
    flex: '1',
    marginLeft: '0.8rem',
    marginRight: '0.8rem',
    height: '0.8rem',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: '0.4rem',
    marginBottom: '0.3rem',
    marginTop: '0.4rem'
  },
  textStyle: {
    fontSize:'0.28rem'

  },
  disabledTrue: {
    backgroundColor: '#ccc',
    color: '#aaa'
  },
  disabledFalse: {
    backgroundColor: '#83b233',
    color: '#fff'
  }
};
