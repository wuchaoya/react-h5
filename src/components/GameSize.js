/**
 * Created by chao on 2017/9/12.
 */
import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: -0.04rem;
  margin-bottom: 0.1rem;
`;

const NewSize = styled.span`
  color: #ff8800;
  font-size: ${(props) => props.fontSize}rem;
  margin-bottom: ${(props) => props.marginBottom}rem;
`;
const OldSize = styled.span`
  color: #999;
  font-size: 0.2rem;
  margin-left: 0.08rem;
  text-decoration:line-through;
`;

export default class GameSize extends Component {
  render () {
    return (
      <Container>
        <NewSize marginBottom={-0.02} fontSize={0.28}>0</NewSize>
        <NewSize fontSize={0.2}>M</NewSize>
        <OldSize>{this.props.size}</OldSize>
      </Container>
    );
  }
};
