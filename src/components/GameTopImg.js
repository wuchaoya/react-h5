/**
 * Created by chao on 2017/9/11.
 */
/**
 * Created by chao on 2017/9/5.
 */
import styled from 'styled-components';
import React, { Component } from 'react';

const Topimg = styled.img`
  display: block;
  `;

const TopDiv = styled.div`
  height: 50%;
  width: 100%;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(0,0,0,0.7)), to(rgba(0,0,0,0)));
  position: absolute;
  top: 0;
  left:0;
`;
const Container = styled.div`
 position: relative;
 z-index: 20;
 overflow: hidden;
`;

export default class GameTopImg extends Component {
  render () {
    return (
      <Container>
        <Topimg src={this.props.uri} width='100%' height='100%' />
        <TopDiv />
      </Container>
    );
  }
};

