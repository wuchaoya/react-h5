/**
 * Created by chao on 2017/10/24.
 */

import React, { Component } from 'react';

export default class InputCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: '获取验证码',
      disable: this.props.disable,
      time: 60
    };
  }
  render () {
    return (
      <div style={styles.container}>
        <input
          ref={this.props.name}
          maxLength={6}
          value={this.props.value}
          placeholder={this.props.placeholder}
          autoFocus={this.props.autoFocus}
          onChange={this.props.onChange}
          style={styles.inputstyle}
          type={this.props.type} />
        <div
          style={Object.assign({}, styles.buttonStyle, this.props.disable ? styles.disableStyle : {})}
          onClick={() => {
            if (this.props.disable) {
              return;
            }
            this.props.getCode();
            this.props.func(true);
            this.setState({
              buttonText:'(' + this.state.time + 'S)重新获取'
            }, () => this.setTime());
          }}
        >{this.state.buttonText}</div>
      </div>
    );
  }
  setTime () {
    this.time = setInterval(() => {
      if (this.state.time !== 1) {
        this.setState({
          time: this.state.time - 1,
          buttonText:'(' + (this.state.time - 1) + 'S)重新获取'
        });
      } else {
        clearInterval(this.time);
        this.props.func(false);
        this.setState({
          time: 60,
          buttonText: '重新获取',
        });
      }
    }, 1000);
  }
  componentWillUnmount () {
    window.clearInterval(this.time);
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
  },
  disableStyle: {
    backgroundColor:'#ccc',
    color:'#aaa'
  }
};
