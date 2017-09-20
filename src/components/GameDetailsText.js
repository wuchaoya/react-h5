/**
 * Created by chao on 2017/9/14.
 */

import React, { Component } from 'react';
let textStyle = {
  color: '#333',
  fontSize: '0.24rem',
  margin:'0',
  padding:'0',
  fontWeight: '400',
  display: '-webkit-box',
  'WebkitBoxOrient': 'vertical',
  overflow: 'hidden'
};
let buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '1.6rem',
  height: '0.8rem',
  color: '#83b233',
  fontSize: '0.24rem'
};
let center = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
};
export default class GameDetailsText extends Component {
  constructor (props) {
    super(props);
    this.state = {
      renderP:true,
      showButton: false,
      showText: false
    };
  }
  render () {
    return (
      <div style={center}>
        <p ref='text' style={
          Object.assign({}, textStyle, this.state.showText ? { 'WebkitLineClamp': '5' } : {})
        }>{this.props.data}</p>
        {this.state.renderP ? <p ref='text2' style={
          Object.assign({}, textStyle, { 'WebkitLineClamp': '1' })
        }>{this.props.data}</p> : null
        }
        {this.state.showButton ? <div style={buttonStyle} onClick={() => {
          this.setState({
            showText: !this.state.showText
          });
        }}>
          {this.state.showText ? '显示全文' : '收起'}
        </div> : null}
      </div>
    );
  }
  componentDidMount () {
    if (this.refs.text.offsetHeight > this.refs.text2.offsetHeight * 5) {
      this.setState({
        showButton: true,
        renderP: false,
        showText: true
      });
    } else {
      this.setState({
        renderP: false
      });
    }
  }
};
