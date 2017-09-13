/**
 * Created by chao on 2017/9/12.
 */
/**
 * Created by chao on 2017/9/12.
 */

import styled from 'styled-components';
import React, { Component } from 'react';

const Button = styled.div`
  background-color: #83b233;
  width: 1.4rem;
  height: 0.61rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.3rem;
  position: absolute;
  right: 0.18rem;
`;
const ButtonText = styled.span`
  font-size: 0.24rem;
  color: #fff;
`;

export default class GameDetailsButton extends Component {
  render () {
    return (
      <Button>
        <ButtonText>立即玩</ButtonText>
      </Button>
    );
  }
};

