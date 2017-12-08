/**
 * Created by chao on 2017/10/23.
 */

import React, { Component } from 'react';
import icon from '../assets/img/user.png';
import loginIcon from '../assets/img/user_login_icon.png';
export default class UserIcon extends Component {
  render () {
    console.log(this.props.login)
    return (
      <div onClick={this.props.onClick} >
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
    overflow: 'hidden',
    margin: '0',
    padding: '0',
    height: '1.2rem',
    width: '1.2rem',
    border: '0.04rem solid #fff',
    borderRadius: '50%',
    backgroundColor:'#fff'
  },
  loginIcon: {
    position: 'absolute',
    left:'0.3rem',
    bottom: '0.4rem',
    backgroundColor: '#fff'
  }
};
