/**
 * Created by chao on 2017/12/7.
 */

import React, { Component } from 'react';

export default class InputPhoneModal extends Component {
  render () {
    return (
      <div style={styles.modal}>
        <div style={
          Object.assign({}, styles.container, this.isWeiXin() ? { marginTop: '-2rem' } : {})}>
          <div style={styles.title}>
            {this.props.title}
          </div>
          <input ref='input' onChange={this.props.onChange} style={styles.inputstyle} type='text' />
          <div style={styles.containerBottom}>
            <div onClick={this.props.onConfirm} style={Object.assign({}, styles.button, styles.green)}>确定</div>
          </div>
        </div>
      </div>
    );
  }
  defaultEvent (event) {
    event.preventDefault();
  }
  componentWillReceiveProps () {
    if (this.props.disabled) {
      document.addEventListener('touchmove', this.defaultEvent, false);
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('touchmove', this.defaultEvent, false);
      document.documentElement.style.overflow = 'visible';
      document.body.style.overflow = 'visible;';
    }
  }
  componentDidMount () {
    document.addEventListener('touchmove', this.defaultEvent, false);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    this.setState({
      height: document.body.clientHeight / 100,
      width: document.body.clientWidth / 100
    });
  }
  isWeiXin () {
    let ua = window.navigator.userAgent.toLowerCase();
    // eslint-disable-next-line
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }
  componentWillUnmount () {
    document.removeEventListener('touchmove', this.defaultEvent, false);
    document.documentElement.style.overflow = 'visible';
    document.body.style.overflow = 'visible';
  }
};

const styles = {
  modal: {
    width: '7.2rem',
    height:'12.8rem',
    backgroundColor:'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    position: 'fixed',
    top:'0',
    left:'0',
    zIndex:'99'
  },
  container: {
    height:'3.64rem',
    width: '5.3rem',
    backgroundColor: '#f2f2f2',
    borderRadius:'0.12rem'
  },
  containerBottom: {
    height: '1.06rem',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: '0.4rem'
  },
  title: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:'1.58rem',
    fontSize:'0.26rem',
    color:'#666',
    borderBottom: '0.01rem solid #ddd'
  },
  button: {
    height: '0.4rem',
    width: '2.65rem',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    color:'#666'
  },
  line: {
    borderRight: '0.01rem solid #ddd'
  },
  green: {
    color: '#83b233'
  },
  inputstyle:{
    display: 'flex',
    marginLeft:'1.4rem',
    marginRight:'0.8rem',
    height:'0.5rem',
    width: '2.6rem',
    color: '#666',
    backgroundColor: '#f5f5f5',
    borderWidth: '0px',
    borderStyle: 'none',
    borderColor:'#ddd',
    padding:'0',
    fontSize: '0.26rem',
    borderBottom: '0.01rem solid #e5e5e5',
    borderTop: '0.01rem solid #e5e5e5',
    outline:'none',
    caretColor:'#999',
  }
};
