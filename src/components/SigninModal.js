/**
 * Created by chao on 2017/12/21.
 */

import React, { Component } from 'react';

import Modal from './ModalC';
import icon from '../assets/img/loading.gif';
import SwissArmyKnife from '../utils/SwissArmyKnife';

export default class SigninModal extends Component {
	constructor (props) {
		super (props);
		this.state = {}
	}
	render () {
		return (
			<Modal  component={this._render(this.props)} />
		);
	}
	_render () {
		console.log(this.props.err)
		return !this.props.err ?
			<div style={styles.errContainer}>
				<img style={styles.iconStyle} src={icon} alt='' />
				<span>登录中</span>
			</div> :
			<div style={
					Object.assign({}, styles.container, SwissArmyKnife.isWeiXin() ? { marginTop: '-2rem' } : {})}>
				<div style={styles.title}>
				{this.props.title}
				</div>
			<div style={styles.containerBottom}>
				<div onClick={this.props.onConfirm} style={Object.assign({}, styles.button, styles.green)}>确定</div>
			</div>
		</div>
	}
};

const styles = {
	container: {
		height:'2.64rem',
		width: '5.3rem',
		backgroundColor: '#f2f2f2',
		borderRadius:'0.12rem'
	},
	containerBottom: {
		height: '1.06rem',
		display:'flex',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},
	title: {
		display:'flex',
		alignItems:'center',
		justifyContent:'center',
		height:'1.58rem',
		fontSize:'0.26rem',
		color:'#666',
		borderBottom: '0.01rem solid #ddd'
	},
	button: {
		height: '0.4rem',
		width: '2.65rem',
		display:'flex',
		justifyContent:'center',
		alignItems:'center',
		color:'#666'
	},
	line: {
		borderRight: '0.01rem solid #ddd'
	},
	green: {
		color: '#83b233'
	},
	errContainer: {
		width: '1.9rem',
		height:'1.9rem',
		borderRadius:'0.12rem',
		backgroundColor:'#fff',
		display:'flex',
		justifyContent:'center',
		alignItems:'center',
		flexDirection:'column',
		fontSize: '0.26rem',
	},
	iconStyle: {
		width:'0.54rem',
		height:'0.58rem',
		marginBottom:'0.1rem'
	}
};