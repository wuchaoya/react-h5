/**
 * Created by chao on 2017/10/18.
 */
import React, { Component } from 'react';
export default class WeChatAuthorize extends Component {
  render () {
    return (
      <div />
    );
  }
  componentWillMount () {
    window.isLogin = true;
    window.location.href = 'http://migugame.cmgame.com/gulu/' +
      'wechat/capacity/getWxCodeInfo?redirectUrl=' + 'http://localhost:3000/home';
  }
};

