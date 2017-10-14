/**
 * Created by chao on 2017/9/14.
 */

import styled from 'styled-components';
import React, { Component } from 'react';

const Button = styled.div`
  background-color: #fff;
  width: 1.4rem;
  height: 0.61rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.3rem;
  position: absolute;
  right: 0.24rem;
  border: 0.01rem solid #b5d185;
  align-self: flex-start;
  margin-top: 0.555rem;
`;
const ButtonText = styled.span`
  font-size: 0.24rem;
  color: #83b233;
`;

export default class GameDetailsButton extends Component {
  render () {
    return (
      <Button onClick={this.props.onClick}>
        <ButtonText>立即玩</ButtonText>
      </Button>
    );
  }
};
