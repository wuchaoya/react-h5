/**
 * Created by chao on 2017/11/29.
 */

import React, { Component } from 'react';

import {GameDetailsText} from '../components';

export default class DetailSummary extends Component {
	
	render () {
		return (
			<div style={styles.container}>
				<h3 style={styles.title}>游戏简介</h3>
				<GameDetailsText ref='infoText' data={this.props.data.content} />
			</div>
		)
	}
}

const styles = {
	container: {
		borderTop: '0.01rem solid #eee',
		backgroundColor: '#fff',
		padding: '0.3rem'
	},
	title: {
		color: '#000',
		fontSize: '0.3rem',
		margin: '0',
		padding: '0',
		marginBottom: '0.2rem',
		fontWeight: '400'
	}
}