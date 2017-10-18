/**
 * Created by chao on 2017/10/16.
 */

import React, { Component } from 'react';
import styled from 'styled-components';
import Gesture from 'rc-gesture';
import History from '../utils/History';

const Contaner = styled.div`
  height: 3.6rem;
  width: ${(props) => props.w}rem;
  margin: 0;
  display: flex;
  flex-direction: row;
  padding: 0.18rem;
  padding-right:0;
  transition: all 0.3s;
  transform:translateX(${(props) => props.translateX}rem) 
`;
const Img = styled.img`
  width: ${(props) => props.w}rem;
  height: ${(props) => props.h}rem;
  margin-right: 0.18rem;
`;
let data =
  ["http://download.hadobi.com/pcloud/001/img01.jpg", "http://download.hadobi.com/pcloud/001/img02.jpg"]
export default class ScrollView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      translateX: 0,
      width: 0,
      height: 0
    };
    this.getImgHeightWidth = this.getImgHeightWidth.bind(this);
  }
  render () {
    return (
      <Gesture
        onPanMove={(gestureStatus) => { console.log(gestureStatus,'onPanMove'); }}
        onTap={(gestureStatus) => { console.log(gestureStatus,'onTap'); }}
        onSwipeLeft={(gestureStatus) => {
          console.log(Math.abs(this.state.translateX));
          console.log((this.state.width / 100 + 0.18) * (data.length - 1))
          if (!(Math.abs(this.state.translateX) < (this.state.width / 100 + 0.18) * (data.length - 1))) {
            return;
          }
          this.setState({
            translateX: this.state.translateX - (this.state.width / 100 + 0.18)
          });
          console.log(gestureStatus, 'onSwipeLeft');
        }}
        onPress={(gestureStatus) => { console.log(gestureStatus,'onPress'); }}
        onSwipeRight={(gestureStatus) => {
          if (this.state.translateX === 0) {
            return;
          }
          console.log(this.state.width)
          this.setState({
            translateX: this.state.translateX + (this.state.width / 100 + 0.18)
          });
        }}
      >
        <div style={{ display:'flex', flex:'1', backgroundColor: '#fff', overflow : 'hidden' }}>
          <Contaner translateX={this.state.translateX} w={data.length * (this.state.width + 18) / 100}>
            {data.map((src, index) => {
              return (
                <Img
                  height={'100%'} width={'100%'}
                  w={this.state.width / 100}
                  h={this.state.height / 100} key={index} ref='img' src={src} />
              );
            })}
          </Contaner>
        </div>
      </Gesture>
    );
  }
  getImgHeightWidth (url) {
    let img = new Image();
    img.src = url;
    let set = setInterval(() => {
      if (img.width > 0 || img.height > 0) {
        this.setState({
          height: img.height,
          width: img.width
        }, () => {
          this.getWidth(this.state.width, this.state.height);
        });
        clearInterval(set);
      }
    }, 40);
  }
  getWidth (width, height) {
    this.setState({
      width: parseInt(width / (height / 360), 0),
      height: 360
    });
  }
  componentDidMount () {
    (this.getImgHeightWidth(data[0]));
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
