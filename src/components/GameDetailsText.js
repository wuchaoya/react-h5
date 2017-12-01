/**
 * Created by chao on 2017/9/14.
 */

import React, { Component } from 'react';

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
      <div style={styles.center}>
        <p ref='text' style={
          Object.assign({}, styles.textStyle, this.state.showText ? { 'WebkitLineClamp': '5' } : {})
        }>{this.props.data}</p>
        {this.state.renderP ? <p ref='text2' style={
          Object.assign({}, styles.textStyle, { 'WebkitLineClamp': '1' })
        }>{this.props.data}</p> : null
        }
        {this.state.showButton ? <div style={styles.buttonStyle} onClick={() => {
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

const styles = {
	textStyle: {
		color: '#333',
		fontSize: '0.24rem',
		margin:'0',
		padding:'0',
		fontWeight: '400',
		display: '-webkit-box',
		'WebkitBoxOrient': 'vertical',
		overflow: 'hidden',
		lineHeight:'0.40rem',
		alignSelf:'flex-start'
	},
  buttonStyle: {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '1.6rem',
	height: '0.8rem',
	color: '#83b233',
	fontSize: '0.24rem',
	marginBottom: '-0.22rem'
},
  center: {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column'
}
}