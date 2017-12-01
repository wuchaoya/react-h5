/**
 * Created by chao on 2017/11/28.
 * 专题头部
 */

import React, { Component } from 'react';

export default class TopicTop extends Component {
	
	render () {
		return (
			<div>
				<img src={this.props.url} height='100%' width='100%' alt='' />
				<p style={styles.textStyle}>{this.props.text}</p>
			</div>
		)
	}
}

const styles = {
	textStyle: {
		padding: '0.32rem 0 0.16rem 0',
		margin:'0 0.25rem 0 0.25rem',
		background: '#ededed',
		color: '#666',
		fontSize: '0.24rem'
	}
}