/**
 * Created by chao on 2017/10/27.
 */

import React, { Component } from 'react';

export default class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render () {
    return (
      <div style={styles.container}>
        <span style={styles.textStyle}>
          {this.props.text}
        </span>
      </div>
    );
  }
};

const styles = {
  container: {
    position: 'fixed',
    bottom:'5rem',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'7.2rem',
    zIndex:'100'
  },
  textStyle: {
    paddingLeft:'0.4rem',
    paddingRight:'0.4rem',
    color:'#fff',
    fontSize:'0.26rem',
    height: '0.86rem',
    backgroundColor:'rgba(0,0,0,0.7)',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:'0.43rem'
  }
};
