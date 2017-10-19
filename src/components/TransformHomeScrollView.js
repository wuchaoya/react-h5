/**
 * Created by chao on 2017/10/19.
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import Gesture from 'rc-gesture';
const Contaner = styled.div`
  height: 4.6rem;
  width: ${(props) => props.w}rem;
  margin: 0;
  padding: 0.18rem;
  padding-bottom: 0rem;
  padding-right:0.06rem;
  padding-left: 0.24rem;
  overflow: hidden;
  display: flex; 
  flex-direction: row
  border-bottom: 0.01rem solid #e5e5e5;
  transition: all 0.3s;
  transform:translateX(${(props) => props.translateX}rem) 
`;
const Img = styled.img`
  width: ${(props) => props.w}rem;
  height: ${(props) => props.h}rem;
  margin-right: 0.24rem;
`;
const titleStyle = {
  height: '0.8rem',
  display: 'flex',
  alignItems: 'center',
  fontSize:'0.3rem',
  color:'#333'
};

export default class TransformHomeScrollView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      translateX: 0,
      width: 0,
      height: 0
    };
    this.getImgHeightWidth = this.getImgHeightWidth.bind(this);
  }
  render () {
    return (
      <Gesture
        onPanMove={(gestureStatus) => { console.log(gestureStatus,'onPanMove'); }}
        onSwipeLeft={(gestureStatus) => {
          if (!(Math.abs(this.state.translateX) < (this.state.width / 100 + 0.24) * (this.props.data.length - 1))) {
            console.log('不滑动');
            return;
          }
          if (Math.abs(this.state.translateX) > ((this.state.width / 100 + 0.24) * (this.props.data.length) - 7.2)) {
            return;
          }
          this.setState({
            translateX: this.state.translateX - (this.state.width / 100 + 0.24)
          });
          console.log(gestureStatus, 'onSwipeLeft');
        }}
        onPress={(gestureStatus) => { console.log(gestureStatus,'onPress'); }}
        onSwipeRight={(gestureStatus) => {
          console.log(this.state.translateX,(this.state.width / 100 + 0.24) * (this.props.data.length - 1))
          if (Math.abs(this.state.translateX) < (this.state.width / 100 + 0.24)) {
            return;
          }
          console.log(this.state.width)
          this.setState({
            translateX: this.state.translateX + (this.state.width / 100 + 0.24)
          });
        }}
      >
        <Contaner translateX={this.state.translateX} w={this.props.data.length * (this.state.width + 24) / 100}>
          {this.props.data.map((item, index) => {
            return (
              <div key={index}>
                <div onClick={() => { this.props.click(item.did); }}>
                  <Img
                    height={'3.9rem'}
                    alt='' width={'100%'}
                    w={this.state.width / 100}
                    h={this.state.height / 100}
                    key={index} ref='img' src={item.cover} />
                  <span style={titleStyle}>{item.title}</span>
                </div>
              </div>
            );
          })}
        </Contaner>
      </Gesture>
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
    this.getImgHeightWidth(this.props.data[0].cover);
  }
};
