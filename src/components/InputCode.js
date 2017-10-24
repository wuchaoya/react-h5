/**
 * Created by chao on 2017/10/24.
 */

import React, { Component } from 'react';

export default class InputCode extends Component {
  render () {
    return (
      <div style={styles.container}>
        <input
          maxLength={5}
          placeholder={this.props.placeholder}
          autoFocus={this.props.autoFocus}
          style={styles.inputstyle}
          type={this.props.type} />
        <div style={styles.buttonStyle}>获取验证码</div>
      </div>
    );
  }
};

const styles = {
  container: {
    position: 'relative'
  },
  inputstyle:{
    display: 'flex',
    flex:'1',
    marginLeft:'0.8rem',
    marginRight:'0.8rem',
    height:'0.8rem',
    width: '5.6rem',
    color: '#666',
    backgroundColor: '#f5f5f5',
    borderWidth: '0px',
    borderStyle: 'none',
    borderColor:'#ddd',
    padding:'0',
    fontSize: '0.26rem',
    borderBottom: '0.01rem solid #ddd',
    borderTop: '0.01rem solid #ddd',
    outline:'none',
    caretColor:'#999'
  },
  buttonStyle: {
    position: 'absolute',
    right: '0.8rem',
    top: '0',
    height: '0.8rem',
    width:'2.4rem',
    backgroundColor:'#83b233',
    color:'#fff',
    fontSize:'0.28rem',
    borderRadius:'0.12rem',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};
