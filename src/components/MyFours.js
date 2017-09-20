/**
 * Created by chao on 2017/9/15.
 */
import React, { Component } from 'react';
import Slider from 'react-slick';
import {baseUrl} from './config';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
const Div = styled.div`
  width: 100px;
  height: 100px;
  background: red
`;
export default class CenterMode extends Component {
  render () {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
        <div><h3>5</h3></div>
        <div><h3>6</h3></div>
      </Slider>
    )
  }
}