/**
 * Created by chao on 2017/9/26.
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import ReactScrollbar from 'react-scrollbar-js';
import '../styles/cssStyle.css';
import ChosenGameItem from '../components/ChosenGameItem';
const Contaner = styled.div`
  width:${(props) => (props.length * 1.6)}rem;
  height: 1.7rem;
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
        style={{height:'1.74rem', width: '7.2rem', backgroundColor: '#fff'}}>
        <Contaner length={this.props.data.length+1}>
          {this.props.data.map((item, index) => {
            return <ChosenGameItem key={index} src={item.icon} />;
          })}
        </Contaner>
      </ReactScrollbar>
    );
  }
  componentDidMount () {
  }
};