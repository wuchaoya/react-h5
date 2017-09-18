/**
 * Created by chao on 2017/9/12.
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import ReactScrollbar from 'react-scrollbar-js';
import '../styles/cssStyle.css';

const Contaner = styled.div`
  height: 3.6rem;
  width: ${(props) => props.w}rem;
  margin: 0;
  padding: 0;
  padding-left: 0.08rem;
  overflow: hidden;
`;
const Img = styled.img`
  width: ${(props) => props.w}rem;
  height: ${(props) => props.h}rem;
  margin-right: 0.18rem;
`;
export default class ScrollView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
    this.getImgHeightWidth = this.getImgHeightWidth.bind(this);
  }
  render () {
    console.log(this.props.data.length)
    return (
      <ReactScrollbar
        style={{height:'3.6rem', width: '7.2rem', backgroundColor: '#fff'}}>
        <Contaner w={this.props.data.length * (this.state.width + 18) / 100}>
          {this.props.data.map((src, index) => {
            return <Img onClick={this.props.click}  height={'100%'} width={'100%'} w={this.state.width / 100} h={this.state.height / 100} key={index} ref='img' src={src} />;
          })}
        </Contaner>
      </ReactScrollbar>
    );
  }
  getImgHeightWidth (url) {
    let img = new Image();
    img.src = url;
    let set = setInterval(() => {
      if (img.width > 0 || img.height > 0) {
        this.setState({
          height: img.height,
          width: img.width
        }, () => {
          this.getWidth(this.state.width, this.state.height);
        });
        clearInterval(set);
      }
    }, 40);
  }
  getWidth (width, height) {
    this.setState({
      width: parseInt(width / (height / 360), 0),
      height: 360
    });
  }
  componentDidMount () {
    (this.getImgHeightWidth(this.props.data[0]));
  }
};
