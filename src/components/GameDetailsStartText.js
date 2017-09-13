/**
 * Created by chao on 2017/9/12.
 */
import styled from 'styled-components';
import React, { Component } from 'react';

const Container = styled.div`
  font-size: 0.24rem;
  color: #333;
`;

export default class GameDetailsStartText extends Component {
  render () {
    return (
      <Container>我的<br />评分</Container>
    );
  }
};
