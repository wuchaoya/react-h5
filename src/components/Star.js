/**
 * Created by chao on 2017/9/6.
 */

import React, { Component } from 'react';
import styled from 'styled-components';

let FaStar = require('react-icons/lib/fa/star');
let FaStarHalfEmpty = require('react-icons/lib/fa/star-half-empty');
const Container = styled.div`
 display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${(props) => props.marginBottom}rem;
`;
const TextNumber = styled.span`
 color: #666;
 font-size: 0.22rem;
 padding-top: 0.02rem;
 padding-left: 0.06rem;
`;
export default class Star extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null
    };
  }
  _renderStar (length, bool) {
    let arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(i);
    }
    return arr.map((itme, index) => {
      return bool ? <FaStar size={12} color='#ff8800' key={'star' + index} /> : <FaStarHalfEmpty size={12} color='#ff8800' key={'starHalfEmpty' + index} />;
    });
  }
  render () {
    const { length } = this.props;
    return <Container marginBottom={this.props.marginBottom}>
      {this._renderStar(parseInt(length / 2, 0), true)}
      {this._renderStar(parseInt(length, 0) % 2, false)}
      {parseInt(length, 0) === 0 ? null : <TextNumber>{parseInt(length, 0)}</TextNumber>}
    </Container>
    ;
  }
};
