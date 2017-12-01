/**
 * Created by chao on 2017/11/29.
 * 游戏类型
 */

import React, { Component } from 'react';

export default class GameClasss extends Component {
	
	render () {
		return (
			<div style={styles.container}>
				{this.props.data.map((item, index) => {
					console.log(item)
					return (
						<div key={index} style={styles.classContainer}>
							<span style={styles.text}>
								{item}
							</span>
						</div>
					)
				})}
			</div>
		)
	}
}

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'row'
	},
	classContainer: {
		display: 'flex',
		justifyContent: 'center',
		border: '0.01rem solid #ddd',
		borderRadius: '0.08rem',
		maring: '0 0.05rem 0 0',
	},
	text: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#aaa',
		fontSize: '0.19rem',
		margin: '0.02rem 0.06rem 0.01rem 0.06rem'
	}
}