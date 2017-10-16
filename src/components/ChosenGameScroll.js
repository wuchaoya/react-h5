/**
 * Created by chao on 2017/9/26.
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import ReactScrollbar from 'react-scrollbar-js';
import '../styles/cssStyle.css';
import ChosenGameItem from '../components/ChosenGameItem';
import Tappable from 'react-tappable/lib/Tappable';
const Contaner = styled.div`
  width:${(props) => (props.length * 1.84)}rem;
  display: flex; 
  flex-direction: row;
`;

let textStyle = {
  color: '#333',
  fontSize: '0.26rem',
  margin:'0',
  padding:'0',
  marginLeft:'0.3rem',
  paddingTop:'0.18rem',
  paddingBottom:'0.24rem',
  fontWeight: '400',
  height: '0.72rem',
  width:'1.72rem',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2',
  overflow: 'hidden'
};

export default class ChosenGameScroll extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }
  render () {
    return (
      <ReactScrollbar
        stopScrollPropagation={true}
        vertical={false}
        style={{marginBottom:'0.06rem', width: '7.2rem', backgroundColor: '#fff'}}>
        <Contaner length={this.props.data.length+1}>
          {this.props.data.map((item, index) => {
            return (
              <Tappable style={{display: 'flex', flexDirection: 'column'}} key={index} onTap={() => this.props.click(item.gid)}>
                <ChosenGameItem key={index} src={item.icon} />
                <div style={{width:'1.72rem'}}>
                  <div style={textStyle}>{item.name}</div>
                </div>
              </Tappable>
            );
          })}
        </Contaner>
      </ReactScrollbar>
    );
  }
  componentDidMount () {
  }
};