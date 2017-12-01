/**
 * Created by chao on 2017/10/27.
 */

import React, { Component } from 'react';

import icon2 from '../assets/img/frame2@2x.png';

export default class ShareTipsModal extends Component {
  render () {
    return (
      <div onClick={this.props.onClick} style={styles.modal}>
        <img style={styles.imgStyle} src={icon2} alt='shareTips' />
        <div style={styles.container} >
          <span>分享给好友</span>
          <span>即可开始游戏</span>
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
    display: 'flex',
    flexDirection: 'column',
    color: '#fff',
    fontSize: '0.32rem',
    position: 'absolute',
    right:'0.3rem',
    top:'1.2rem',
    transform:'rotate(90deg)'
  },
  imgStyle: {
    height: '1.6rem',
    width: '3.16rem',
    transform:'rotate(90deg)',
    position: 'absolute',
    right:'-0.32rem',
    top:'0.8rem'
  }
};
