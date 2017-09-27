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
  height: 1.7rem;
  display: flex; 
  flex-direction: row
`;

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
        style={{height:'2.45rem', width: '7.2rem', backgroundColor: '#fff'}}>
        <Contaner length={this.props.data.length+1}>
          {this.props.data.map((item, index) => {
            return (
              <Tappable style={{display: 'flex', flexDirection: 'column'}} key={index} onTap={() => this.props.click(item.gid)}>
                <ChosenGameItem key={index} src={item.icon} />
                <span style={{marginLeft:'0.24rem', width:'1.72rem', height:'0.6rem'}}>aaa</span>
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