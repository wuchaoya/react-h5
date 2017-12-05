/**
 * Created by chao on 2017/11/27.
 * 加载动画
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const loadingIcon = require('../assets/img/loading.gif');
const errIcon = require('../assets/img/emoji.png');
const loadingText = '加载中';
const errText = '连接失败';
const buttonText = '重试';

export default class Loading extends Component {
	
	render () {
		let props= this.props;
		return props.state === 0 ? null : (
			<div style={Object.assign({}, styles.containerStyle, props.containerStyle)}>
				{props.state === -1 ? <img style={Object.assign({}, styles.loadingIconStyle, props.loadingIconStyle)} src={props.loadingIcon || loadingIcon} alt=''/> : null}
				{props.state === -1 ? <span style={Object.assign(JSON.parse( JSON.stringify(styles.marginTop)), styles.textStyle, props.loadingTextStyle)}>{props.loadingText || loadingText}</span> : null}
				{props.state === 1 ? <img style={Object.assign({}, styles.errIconStyle, props.errIconStyle)} src={props.errIcon || errIcon} alt=''/> : null}
				{props.state === 1 ? <span style={Object.assign(JSON.parse( JSON.stringify(styles.marginBottom)), styles.textStyle, props.errTextStyle)}>{props.loadingText || errText}</span> : null}
				{props.state === 1 ? <div onClick={props.onClick} style={Object.assign( JSON.parse( JSON.stringify(styles.buttonStyle)), styles.center, props.buttonStyle)}>{props.buttonText || buttonText}</div> : null}
			</div>);
	}
}

Loading.PropTypes = {
	state: PropTypes.number,
	loadingIcon: PropTypes.any,
	loadingText: PropTypes.string,
	errIcon: PropTypes.any,
	errText: PropTypes.string,
	buttonText: PropTypes.string,
	onClick: PropTypes.func,
	containerStyle: PropTypes.object,
	loadingIconStyle: PropTypes.object,
	errIconStyle: PropTypes.object,
	loadingTextStyle: PropTypes.object,
	errTextStyle: PropTypes.object,
	buttonStyle: PropTypes.object
}

const styles = {
	loadingIconStyle: {
		width: '0.54rem',
		height: '0.58rem'
	},
	errIconStyle: {
		width: '1.6rem',
		height: '1.6rem',
		marginBottom: '0.16rem'
	},
	textStyle: {
		fontSize: '0.28rem',
		color: '#666',
	},
	buttonStyle: {
		height: '0.6rem',
		width: '1.4rem',
		backgroundColor: '#83b233',
		color: '#fff',
		borderRadius: '0.2rem',
		fontWeight: '400'
	},
	containerStyle: {
		display: 'flex',
		backgroundColor: '#ededed',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: document.getElementsByTagName('html')[0].clientHeight
	},
	center: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	marginTop: {
		marginTop: '0.12rem'
	},
	marginBottom: {
		marginBottom: '0.16rem'
	}
};
