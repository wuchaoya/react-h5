/**
 * Created by chao on 2017/12/4.
 */

import React, { Component } from 'react';

export default class Modal extends Component {
	render () {
		return (
			<div onClick={this.props.onClick ? this.props.onClick : () => {}}
			     style={Object.assign({}, styles.modal, this.props.style? this.props.style : {})}>
				{this.props.component}
			</div>
		);
	}
	
	
	componentDidMount () {
		this.stopScroll();
	}
	
	componentWillUnmount () {
		this.openScroll();
	}
	
	defaultEvent (event) {
		event.preventDefault();
	}
	
	stopScroll () {
		document.addEventListener('touchmove', this.defaultEvent, false);
		document.documentElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';
	}
	
	openScroll () {
		document.removeEventListener('touchmove', this.defaultEvent, false);
		document.documentElement.style.overflow = 'visible';
		document.body.style.overflow = 'visible';
	}
	
};

const styles = {
	modal: {
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight,
		backgroundColor: 'rgba(0,0,0,0.7)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'fixed',
		top: '0',
		left: '0',
		zIndex: '99'
	},
	container: {
		height: '2.64rem',
		width: '5.3rem',
		backgroundColor: '#f2f2f2',
		borderRadius: '0.12rem'
	},
	containerBottom: {
		height: '1.06rem',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	title: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '1.58rem',
		fontSize: '0.26rem',
		color: '#666',
		borderBottom: '0.01rem solid #ddd'
	},
	button: {
		height: '0.4rem',
		width: '2.65rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#666'
	},
	line: {
		borderRight: '0.01rem solid #ddd'
	},
	green: {
		color: '#83b233'
	}
}