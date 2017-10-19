/**
 * Created by chao on 2017/10/19.
 */

import React, { Component } from 'react';
import styled from 'styled-components';
import Gesture from 'rc-gesture';
import ChosenGameItem from '../components/ChosenGameItem';

const Contaner = styled.div`
  width: ${(props) => props.w}rem;
  display: flex; 
  flex-direction: row;
  transition: all 0.5s;
  transform:translateX(${(props) => props.translateX}rem) 
`;
let textStyle = {
  width:'1.72rem',
  color: '#333',
  marginTop:'0.24rem',
  fontSize: '0.26rem',
  fontWeight: '400',
  display: '-webkit-box',
  textOverflow:'ellipsis',
  OtextOverflow:'ellipsis',
  'WebkitBoxOrient': 'vertical',
  overflow: 'hidden',
  WebkitLineClamp: '2'
};
let center = {
  width:'1.72rem',
  height: '1.4rem',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};
export default class TransformChosenGameScroll extends Component {
  constructor (props) {
    super(props);
    this.state = {
      translateX: 0,
      width: 174,
      height: 0
    };
  }
  render () {
    return (
      <Gesture
        onPanMove={(gestureStatus) => { console.log(gestureStatus,'onPanMove'); }}
        onSwipeLeft={(gestureStatus) => {
          if (!(Math.abs(this.state.translateX) < (this.state.width / 100 + 0.24) * (this.props.data.length - 1))) {
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
          if (Math.abs(this.state.translateX) < (this.state.width / 100 + 0.24)) {
            return;
          }
          this.setState({
            translateX: this.state.translateX + (this.state.width / 100 + 0.24)
          });
        }}
      >
        <Contaner translateX={this.state.translateX} w={this.props.data.length * (174 + 24) / 100}>
          {this.props.data.map((item, index) => {
            return (
              <div
                style={{ display: 'flex', flexDirection: 'column', marginLeft: '0.24rem' }}
                key={index} onClick={() => this.props.click(item.gid)}>
                <ChosenGameItem key={index} src={item.icon} />
                <div style={center}>
                  <div style={
                    Object.assign({}, textStyle, { 'WebkitLineClamp': '2' })
                  }>{item.name}</div>
                </div>
              </div>
            );
          })}
        </Contaner>
      </Gesture>
    );
  }
  componentDidMount () {
  }
};
