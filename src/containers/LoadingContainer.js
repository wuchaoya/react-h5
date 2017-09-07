/**
 * Created by chao on 2017/9/7.
 */

import styled from 'styled-components';
import React, { Component } from 'react';
import loadingGif from '../assets/loading.gif';
import errPng from '../assets/emoji.png';

const Img = styled.img`
  width: 0.54rem;
  height: 0.58rem;
  `;
const ErrImg = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  margin-bottom: 0.16rem;
`;
const Text = styled.p`
  font-size: 0.28rem;
  color: #666;
  margin: 0;
  margin-top: 0.12rem;
`;
const ErrButton = styled.button`
  height: 0.6rem;
  width: 1.4rem;
  background-color: #83b233;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border:none;
  border-radius: 0.3rem;
  font-size: 0.2rem;
  font-weight: 400;
`;
const ErrText = styled.p`
  font-size: 0.28rem;
  color: #666;
  margin: 0;
  margin-bottom: 0.16rem;
`;
const Container = styled.div`
 display: flex;
 height: ${(props) => (props.height)}px;
 justify-content: center;
 align-items: center;
 background-color: #ededed;
 flex-direction: column;
`;

export default class LogdingContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      height: 0
    };
  }
  render () {
    return (
      <Container height={this.state.height}>
        {this.props.err ? null : <Img src={loadingGif} />}
        {this.props.err ? null : <Text>加载中</Text>}
        {this.props.err ? <ErrImg src={errPng} /> : null}
        {this.props.err ? <ErrText>连接失败</ErrText> : null}
        {this.props.err ? <ErrButton onClick={this.props.clickButton}>重试</ErrButton> : null}
      </Container>
    );
  }
  componentDidMount () {
    document.getElementsByTagName('html')[0].style.height = '100%';
    this.setState({
      height: document.getElementsByTagName('html')[0].clientHeight
    });
  }
};

