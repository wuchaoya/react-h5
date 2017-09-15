/**
 * Created by chao on 2017/9/15.
 */

import styled from 'styled-components';
import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Container = styled.div`
 position: absolute;
 top: 0;
 z-index: 999;
 width: 7.2rem;
 height: 12.8rem;
 background-color: #fff;
 overflow: hidden;
`;

export default class Modal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      height: 0,
      width: 0
    };
  }
  render () {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Container h={this.state.height} w={this.state.width}>
        <Slider {...settings}>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
          <div><h3>5</h3></div>
          <div><h3>6</h3></div>
        </Slider>
      </Container>
    );
  }
  defaultEvent (event) {
    event.preventDefault();
  }
  componentDidMount () {
    document.addEventListener('touchmove', this.defaultEvent, false);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    this.setState({
      height: document.body.clientHeight / 100,
      width: document.body.clientWidth / 100
    });
  }

  componentWillUnmount () {
    document.removeEventListener('touchmove', this.defaultEvent, false);
  }
};

