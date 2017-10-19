/**
 * Created by chao on 2017/10/19.
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import Gesture from 'rc-gesture';

const Contaner = styled.div`
  height: 3.6rem;
  width: ${(props) => props.w}rem;
  margin: 0;
  display: flex;
  flex-direction: row;
  padding: 0.18rem;
  padding-right:0;
  transition: all 0.3s;
  transform:translateX(${(props) => props.translateX}rem) 
`;
const Img = styled.img`
  width: ${(props) => props.w}rem;
  height: ${(props) => props.h}rem;
  margin-right: 0.18rem;
`;
export default class TransformScrollView extends Component {
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
          console.log(Math.abs(this.state.translateX));
          console.log(!Math.abs(this.state.translateX) < (this.state.width / 100 + 0.18) * (this.props.data.length - 1))
          if (!(Math.abs(this.state.translateX) < (this.state.width / 100 + 0.18) * (this.props.data.length - 1))) {
            console.log('不滑动');
            return;
          }
          if (Math.abs(this.state.translateX) > ((this.state.width / 100 + 0.18) * (this.props.data.length) - 7.2)) {
            return;
          }
          this.setState({
            translateX: this.state.translateX - (this.state.width / 100 + 0.18)
          });
          console.log(gestureStatus, 'onSwipeLeft');
        }}
        onPress={(gestureStatus) => { console.log(gestureStatus,'onPress'); }}
        onSwipeRight={(gestureStatus) => {
          console.log(this.state.translateX,(this.state.width / 100 + 0.18) * (this.props.data.length - 1))
          if (Math.abs(this.state.translateX) < (this.state.width / 100 + 0.18)) {
            return;
          }
          console.log(this.state.width)
          this.setState({
            translateX: this.state.translateX + (this.state.width / 100 + 0.18)
          });
        }}
      >
        <div style={{ display:'flex', flex:'1', backgroundColor: '#fff', overflow : 'hidden' }}>
          <Contaner translateX={this.state.translateX} w={this.props.data.length * (this.state.width + 18) / 100}>
            {this.props.data.map((src, index) => {
              return (
                <div key={index} onClick={() => this.props.click(index)}>
                  <Img
                    height={'100%'} width={'100%'}
                    w={this.state.width / 100}
                    h={this.state.height / 100} ref='img' src={src} />
                </div>
              );
            })}
          </Contaner>
        </div>
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
    (this.getImgHeightWidth(this.props.data[0]));
  }
};