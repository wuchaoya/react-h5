/**
 * Created by chao on 2017/9/14.
 */

import styled from 'styled-components';
import React, { Component } from 'react';

const Text = styled.span`
  color: #fff;
  font-size: 0.26rem;
  `;

const Container = styled.div`
 height: 0.88rem;
 display: flex;
 justify-content: center;
 align-items: center;
 background-color: #161616;
`;

export default class GameListHead extends Component {
  render () {
    return (
      <Container>
        <Text>游戏列表</Text>
      </Container>
    );
  }
};

