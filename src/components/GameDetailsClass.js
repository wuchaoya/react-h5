/**
 * Created by chao on 2017/9/12.
 */

import styled from 'styled-components';
import React, { Component } from 'react';

const GameClassText = styled.span`
  color: #aaa;
  font-size: 0.22rem;
  display: flex;
  justify-content: center;
  margin-left: 0.06rem;
  margin-right: 0.06rem;
  align-items: center;
  `;

const GameClassContainer = styled.div`
 border: 0.01rem solid #ddd;
 border-radius: 0.08rem;
 margin-right: 0.08rem;
 display: flex;
 justify-content: center;
`;
const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export default class GameDetailsClass extends Component {
  render () {
    return (
      <Container>
        {this.props.data.map((item, index) => {
          return <GameClassContainer key={index}>
            <GameClassText>{item}</GameClassText>
          </GameClassContainer>;
        })}
      </Container>
    );
  }
};

