/**
 * Created by chao on 2017/9/12.
 */
import styled from 'styled-components';
import React, { Component } from 'react';

const Container = styled.div`
  font-size: 0.24rem;
  color: #333;
`;
const Text = styled.p`
  margin:0;
  padding:0;
`;

export default class GameDetailsStartText extends Component {
  render () {
    return (
      <Container>
        <Text>我的</Text>
        <Text>评分</Text>
      </Container>
    );
  }
};
