/**
 * Created by chao on 2017/12/4.
 */

import * as React from 'react';

import {
	Star,
	GameClass,
	Button
} from '../components';

export default class GameListItem extends React.Component {
	
	render () {
		return (
			<div style={styles.container}>
				<img style={styles.icon} src={this.props.data.icon} alt='' />
				<div style={styles.info}>
					<Star marginBottom={0.14} length={this.props.data.score} />
					<GameClass data={this.props.data.label = ['好玩', '不错']} />
				</div>
				<Button buttonText='立即玩' />
			</div>
		);
	}
}

const styles = {
	container: {
		backgroundColor: '#fff',
		padding: '0.3rem',
		paddingRight: '0.24rem',
		borderBottom: '0.01rem solid #eee',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	icon: {
		height: '1.68rem',
		width: '1.68rem',
		borderRadius: '0.4rem',
		border: '0.01rem solid #e5e5e5'
	},
	info: {
		marginLeft: '0.24rem',
		flex: '0.7',
		overflow: 'hidden',
		textOverflow:'ellipsis',
		whiteSpace: 'nowrap'
	}
}