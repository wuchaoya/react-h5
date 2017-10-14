/**
 * Created by chao on 2017/9/25.
 */

import React, { Component } from 'react';
import styled from 'styled-components';

let FaStar = require('react-icons/lib/fa/star');
const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0.15rem;
  margin-bottom: ${(props) => props.marginBottom}rem;
`;
export default class MyStart extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      number: 0
    };
  }
  _renderStar (number) {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(i);
    }
    return arr.map((itme, index) => {
      // eslint-disable-next-line
      if (index < number/2) {
        return <FaStar style={{marginRight: '0.08rem'}} size={20}color='#ff8800' key={'star' + index} />;
      } else {
        return <FaStar onClick={() => {
          this.setState({
            number:(index + 1) * 2
          });
        }} size={20}color='#ddd' style={{marginRight: '0.08rem'}} key={'star' + index} />;
      }
    });
  }
  render () {
    // eslint-disable-next-line
    const { length } = this.props;
    // eslint-disable-next-line
    return <Container marginBottom={this.props.marginBottom}>
      {this._renderStar(this.state.number)}
    </Container>
      ;
  }
};
