/**
 * Created by chao on 2017/10/24.
 */

import React, { Component } from 'react';

export default class SignTiTle extends Component {
  render () {
    return (
      <div style={styles.container}>
        <span style={styles.textStyle}>{this.props.title}</span>
      </div>
    );
  }
};

const styles = {
  container: {
    display:'flex',
    flex: '1',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '0.6rem',
    marginBottom: '0.3rem',
    border:'none'
  },
  textStyle: {
    fontSize: '0.28rem',
    color: '#83b233'
  }
};
