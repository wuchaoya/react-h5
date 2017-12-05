/**
 * Created by chao on 2017/11/29.
 * 专题卡片
 */

import React, { Component } from 'react';
import {
	Button,
	Text,
	GameClass,
	Star
} from '../components';

export default class TopicItem extends Component{
	
	render () {
		return (
			<div onClick={() => this.historyPush('gamedetails', {gid: this.props.data.gid })}
			     style={styles.container}>
				<div style={styles.containerTop}>
					<img style={styles.icon} src={this.props.data.icon} alt='' />
					<div style={styles.CTLeft}>
						<Text margin='0.2rem 0 0.06rem 0' color='#000' size={0.28} text={this.props.data.name} />
						<div style={styles.infoContainer}>
							<GameClass data={this.props.data.label} />
							<Star length={this.props.data.score} />
						</div>
					</div>
					<Button onClick={(e) => {
						e.stopPropagation();
						this.historyPush('playgame', {pkg: this.props.data.pkg })}}  buttonText='立即玩' />
				</div>
				<img width='100%' src={this.props.data.cover} alt='' />
				<div style={styles.text}>{this.props.data.game_summary}</div>
			</div>
		)
	}
	historyPush (path,data) {
		this.props.history.push(path, data);
	}
	
	componentWillMount () {
	}
};

const styles = {
	container: {
		flex: '1',
		margin: '0.24rem 0.12rem 0 0.12rem',
		backgroundColor: '#fff',
		borderRadius: '0.12rem'
	},
	containerTop: {
		display: 'flex',
		justifyContent: 'flex-start'
	},
	icon: {
		borderRadius: '0.12rem',
		width: '0.74rem',
		height: '0.74rem',
		margin: '0.2rem 0.18rem 0.2rem 0.2rem',
	},
	CTLeft: {
		display: 'flex',
		flexDirection: 'column'
	},
	infoContainer: {
		display: 'flex',
		flexDirection: 'row'
	},
	text: {
		margin: '0.36rem 0.2rem 0 0.2rem',
		paddingBottom: '0.36rem',
		fontSize: '0.24rem',
		color: '#666'
	}
}