/**
 * Created by chao on 2017/10/26.
 */
import React, { Component } from 'react';

export default class ErrModal extends Component {
  render () {
    return (
      <div style={styles.modal}>
        <div style={
          Object.assign({}, styles.container, this.isWeiXin() ? { marginTop: '-2rem' } : {})}>
          <div style={styles.title}>
            {this.props.title}
          </div>
          <div style={styles.containerBottom}>
            <div onClick={this.props.onCancel} style={Object.assign({}, styles.button, styles.line)}>取消</div>
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
    console.log(ua);
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
    left:'0'
  },
  container: {
    height:'2.64rem',
    width: '5.3rem',
    backgroundColor: '#f2f2f2',
    borderRadius:'0.12rem'
  },
  containerBottom: {
    height: '1.06rem',
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
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
  }
};
