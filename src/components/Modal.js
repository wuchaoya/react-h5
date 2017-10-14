/**
 * Created by chao on 2017/9/15.
 */

import styled from 'styled-components';
import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';
const Container = styled.div`
 position: fixed;
 top: 0;
 z-index: 999;
 width: 7.2rem;
 height: 12.8rem;
 background-color: rgba(0,0,0,0.7);
 overflow: hidden;
 align-items: center;
 display: flex;
`;

const Img = styled.img`
  
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

class Modal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      height: 0,
      width: 0
    };
  }
  render () {
    return (
      <Container onClick={this.props.click} disable={this.props.disabled} h={this.state.height} w={this.state.width}>

        <Slider initialSlide={this.props.index} {...settings}>
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
  componentWillReceiveProps () {
    if (this.props.disabled) {
      document.addEventListener('touchmove', this.defaultEvent, false);
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('touchmove', this.defaultEvent, false);
      document.documentElement.style.overflow = 'visible';
      document.body.style.overflow = 'visible;';
    }
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
    document.documentElement.style.overflow = 'visible';
    document.body.style.overflow = 'visible';
  }
};
Modal.PropTypes = {
  data: PropTypes.array,
  index: PropTypes.number,
  disabled: PropTypes.bool,
  click: PropTypes.func
};

export default Modal;
