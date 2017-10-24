/**
 * Created by chao on 2017/10/23.
 */

import React, { Component } from 'react';
import icon from '../assets/user.png';
import loginIcon from '../assets/user_login_icon.png';
export default class UserIcon extends Component {
  render () {
    return (
      <div onClick={() => this.props.click} >
        <img style={Object.assign(
          {},
          styles.iconStyle,
          this.props.login ? styles.loginIcon : {}
        )} src={!this.props.login ? icon : loginIcon} alt='' />
      </div>
    );
  }
}

const styles = {
  iconStyle: {
    height: '1.2rem',
    width: '1.2rem',
    border: '0.06rem solid #fff',
    borderRadius: '0.66rem',
    overflow: 'hidden',
    margin: '0',
    padding: '0'
  },
  loginIcon: {
    position: 'absolute',
    left:'0.3rem',
    bottom: '0.4rem',
    backgroundColor: '#fff'
  }
};
