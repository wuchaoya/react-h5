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
 display: ${(props) => props.disable ? 'none' : 'block'}
`;

const Img = styled.img`
  
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
      <Container disable={this.props.disabled} h={this.state.height} w={this.state.width}>
        <Slider {...settings}>
          {this.props.data.map((url, index) => {
            return <Img onClick={this.props.click} key={index} height='100%' width='100%' src={url} />;
          })}
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

