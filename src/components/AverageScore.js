/**
 * Created by chao on 2017/9/12.
 */

import styled from 'styled-components';
import React, { Component } from 'react';

let icon = require('../assets/game_grade_icon.png');
const Text = styled.span`
  color: #999;
  font-size: 0.24rem;
  `;

const Container = styled.div`
 width: 0.7rem;
 height: 0.7rem;
 display: flex;
 justify-content: center;
 align-items: center;
 background-image: url("${icon}");
 background-size: 0.7rem 0.7rem;
 position: absolute;
 right: 0.53rem;
`;

export default class GameClass extends Component {
  render () {
    return (
      <Container>
        <Text>{parseInt(this.props.score, 0)}</Text>
      </Container>
    );
  }
};

