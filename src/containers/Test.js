/**
 * Created by chao on 2017/10/16.
 */

import React, { Component } from 'react';

import Gesture from 'rc-gesture';
import History from '../utils/History';

export default class ScrollView extends Component {
  render () {
    return (
      <Gesture

        onTap={(gestureStatus) => { console.log(gestureStatus,'onTap'); }}
        onSwipeLeft={(gestureStatus) => { console.log(gestureStatus,'onSwipeLeft'); }}
        onPress={(gestureStatus) => { console.log(gestureStatus,'onPress'); }}
        onSwipeRight={(gestureStatus) => { console.log(gestureStatus,'onSwipeRight'); }}
      >
        <div style={styles.divStyle}>
          <div style={styles.itemStyle} />
          <div style={styles.itemStyle} />
          <div style={styles.itemStyle} />
          <div style={styles.itemStyle} />
        </div>
      </Gesture>
    );
  }
  componentDidMount () {
    console.log(History.Splice({
      appid: 'wx94c25ed4df8df7e3',
      redirect_uri: 'http://yun.cmgame.com/home',
      response_type: 'code',
      scope: 'snsapi_userinfo',
      state: 'snsapi_userinfo'
    }));
    console.log(History.CodeUrl({
      appid: 'wx94c25ed4df8df7e3',
      secret: '99cfd1049e4f8dceb6a7e23076245798',
      code: '081JnwNr1iLx3q07kxNr1B7zNr1JnwNP',
      grant_type: 'authorization_code'
    }));
    console.log(History.UserInfoUrl({
      access_token: 'YQlhAsKUUCCKmxUyCaCUsVEE9HV51eDlq-CdvuL1FMuC1sE5NcA4YX6HP0QeXyE2cCZrl8wN33Y7gNUMamv2XA',
      openid: 'oactvw5uo9gzO5I8MjVqo8ZUiEZg',
      lang: 'zh_CN'
    }));
  }
};

const styles = {
  divStyle: {
    height: '4rem',
    width: '4rem',
    backgroundColor:'#eee',
    display: 'flex',
    flexDirection: 'row'
  },
  itemStyle: {
    width: '2rem',
    height: '4rem',
    backgroundColor:'red',
    marginRight:'0.2rem'
  }
};

