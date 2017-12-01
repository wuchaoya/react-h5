/**
 * Created by chao on 2017/11/30.
 */

import React, { Component } from 'react';

import {GameDetailsOtherInfo} from '../components';

export default class DetailsOther extends Component {
	
	render () {
		console.log(this.props.data)
		return (
			<div style={styles.container}>
				{this.props.data.company ? <GameDetailsOtherInfo name='开发商' text={this.props.data.company} /> : null}
				{this.props.data.update_time ? <GameDetailsOtherInfo name='更新日期' text={this.props.data.update_time} /> : null}
				{this.props.data.version ? <GameDetailsOtherInfo name='版本' text={this.props.data.version} /> : null}
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
}