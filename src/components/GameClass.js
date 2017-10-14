/**
 * Created by chao on 2017/9/6.
 */

import styled from 'styled-components';
import React, { Component } from 'react';

const GameClassText = styled.span`
  color: #aaa;
  font-size: 0.19rem;
  display: flex;
  justify-content: center;
  margin: 0.02rem 0.06rem 0.01rem 0.06rem;
  align-items: center;
  `;

const GameClassContainer = styled.div`
 border: 0.01rem solid #ddd;
 border-radius: 0.08rem;
 margin-right: 0.05rem;
 display: flex;
 justify-content: center;
`;

export default class GameClass extends Component {
  render () {
    return (
      <GameClassContainer>
        <GameClassText>{this.props.name}</GameClassText>
      </GameClassContainer>
    );
  }
};

