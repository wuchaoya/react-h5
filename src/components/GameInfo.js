/**
 * Created by chao on 2017/11/29.
 * 游戏详情信息
 */

import React, { Component } from 'react';

import {
	Button,
	GameSize,
	GameClass,
	MyStart
} from '../components';


let icon = require('../assets/img/game_grade_icon.png');

export default class GameInfo extends Component {
	
	render () {
		return (
			<div style={styles.container}>
				<div style={styles.topContainer}>
					<img style={styles.icon} src={this.props.data.icon} alt='' />
					<div style={styles.textContainer}>
						<h3 style={styles.name}>{this.props.data.name}</h3>
						<GameSize size={this.props.data.size} />
						<GameClass data={this.props.data.label} />
					</div>
					<Button onClick={this.props.onClick} buttonText='立即玩' />
				</div>
				<div style={styles.bottomContainer}>
					<div style={styles.starText}>
						<span>我的</span>
						<span>评分</span>
					</div>
					<MyStart score={this.score} length={this.props.data.score} />
					<div style={styles.starNumberContainer}>
						<span>{parseInt(this.props.data.score, 0)}</span>
					</div>
				</div>
			</div>
		)
	}
}

const styles = {
	container: {
		background: '#fff',
		borderRadius: '0.12rem',
		margin: '0.06rem 0.12rem 0 0.12rem',
		padding: '0.18rem 0.18rem 0.12rem 0.26rem'
	},
	topContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: '0.3rem',
		marginTop: '0.12rem'
	},
	icon: {
		height: '1.3rem',
		width: '1.3rem',
		border: '0.01rem solid #e5e5e5',
		borderRadius: '0.3rem'
	},
	textContainer: {
		margin: '-0.06rem 0 0 0.18rem',
		display: 'flex',
		flex: '0.7',
		overflow: 'hidden',
		textOverflow:'ellipsis',
		whitespace: 'nowrap',
		flexDirection: 'column'
	},
	name: {
		margin: '0',
		padding: '0',
		fontSize: '0.3rem',
		textOverflow:'ellipsis',
		whitespace: 'nowrap',
		color: '#000'
	},
	bottomContainer: {
		display: 'flex',
		flexDirection: 'row',
		borderTop: '0.01rem solid #eee',
		height: '1.06rem',
		alignItems: 'center',
		paddingLeft: '0.08rem'
	},
	starText: {
		fontSize: '0.24rem',
		display: 'flex',
		flexDirection: 'column',
	},
	starNumberContainer: {
		width: '0.7rem',
		height: '0.7rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundImage:'url(' + icon + ')',
		backgroundSize: '0.7rem 0.7rem',
		overflow: 'hidden',
		alignSelf: 'flexStart',
		position: 'absolute',
		right: '0.65rem',
		marginTop:'0.2rem'
	}
}