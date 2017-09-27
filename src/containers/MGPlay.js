/**
 * Created by chao on 2017/9/26.
 */

import React, { Component } from 'react';
import styled from 'styled-components';
import HttpRequest from '../utils/HttpRequest';

const Box = styled.div`
  height: ${(props) => props.h / 100}rem;
`;

export default class MGPlay extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      err: false,
      roomId: null,
      xml: null
    };
  }

  render () {
    let height = document.getElementsByTagName('html')[0].clientHeight;
    return (
      <Box id='playGameBox' h={height} />
    );
  }
  GetQueryString (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }
  checkRoomId (id) {
    HttpRequest.checkRoomId({ battleId:id }, (res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    }
    );
  }

  getRoomId () {
    HttpRequest.getRoomId({}, (res) => {
      console.log(res);
      this.checkRoomId(res.id);
      this.checkRoomId(res.battleCode);
      this.checkRoomId(res.battleCode + res.id);
      this.checkRoomId(res.id + res.battleCode);
    }, (err) => {
      console.log(err);
    });
  }
  componentDidMount () {
    this.getRoomId();
  }

  componentWillUnmount () {

  }

};
