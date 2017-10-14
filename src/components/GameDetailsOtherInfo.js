/**
 * Created by chao on 2017/9/14.
 */
/**
 * Created by chao on 2017/9/12.
 */
/**
 * Created by chao on 2017/9/12.
 */

import styled from 'styled-components';
import React, { Component } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 0 0.1rem 0;
`;
const LeftText = styled.span`
  font-size: 0.24rem;
  color: #999;
  width: 1rem;
`;
const RightText = styled.span`
  font-size: 0.24rem;
  color: #333;
  margin-left: 0.24rem;
`;

export default class GameDetailsOtherInfo extends Component {
  render () {
    return (
      <Container>
        <LeftText>{this.props.name}</LeftText>
        <RightText>{this.props.text}</RightText>
      </Container>
    );
  }
};

