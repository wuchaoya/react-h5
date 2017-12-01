/**
 * Created by chao on 2017/10/27.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Icon from '../assets/back.png';
import next from '../assets/next.png';
import { loginOut } from '../actions/actions';

class SettingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  render () {
    return (
      <div style={styles.container}>
        <div style={styles.goBackcontainer}>
          <div onClick={() => {
            this.props.history.goBack();
          }}>
            <img style={Object.assign({}, styles.iconStyle, { marginTop:'0.1rem' })} src={Icon} alt='' />
          </div>
          <span>设置</span>
          <div style={styles.iconStyle} />
        </div>
        <div style={styles.itme}>
          <span>用户服务协议</span>
          <img style={styles.next} src={next} alt='next' />
        </div>
        <div style={Object.assign({}, styles.itme, styles.line)}>
          <span>联系客服</span>
          <img style={styles.next} src={next} alt='next' />
        </div>
        <div onClick={() => {
          this.props.loginOut();
          this.props.history.goBack();
        }} style={styles.exitButton}>
          退出登录
        </div>
      </div>
    );
  }
  componentWillMount () {
    document.title = '设置';
    document.getElementsByTagName('html')[0].style.background = '#ededed';
    document.getElementsByTagName('body')[0].style.background = '#ededed';
  }
};

const styles = {
  container: {
    display:'flex',
    flexDirection:'column',
    fontSize:'0.28rem',
    color:'#333'
  },
  itme: {
    background:'#fff',
    height:'1rem',
    display:'flex',
    alignItems:'center',
    justifyContent: 'space-between',
    paddingLeft:'0.24rem',
    paddingRight:'0.24rem'
  },
  line: {
    borderTop:'0.01rem solid #ededed'
  },
  exitButton: {
    background:'#fff',
    height:'1rem',
    marginTop:'0.12rem',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  goBackcontainer: {
    display:'flex',
    flex:'1',
    height:'0.88rem',
    alignItems:'center',
    background:'#000',
    justifyContent: 'space-between',
    color:'#fff',
    fontSize:'0.26rem',
    marginBottom:'0.12rem'
  },
  iconStyle: {
    width: '0.66rem',
    height: '0.66rem'
  },
  next: {
    width:'0.1rem',
    height:'0.17rem'
  }
};

const getState = state => {
  return {
    login: state.update.login
  };
};

export default connect(getState, { loginOut })(SettingContainer);

