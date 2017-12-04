/**
 * Created by chao on 2017/12/1.
 */

import * as React from 'react';

import {
	Text,
	PurchaseItem
} from '../components';

export default class Purchase extends React.Component {
	
	render () {
		return (
			<div style={styles.container}>
				<Text margin='0.52rem 0 0.12rem 0.24rem' color='#000' size={0.3} text='会员购买' />
				{this.props.data.map((item, index) => {
					return (
						<PurchaseItem
							isRecommend={index === 1}
							data={item}
							key={index} />
					)
				})}
			</div>
		)
	}
	
}

const styles = {
	container: {
		background: '#fff',
		padding: '0.52rem 0.3rem 0 0.3rem'
	},
	item: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		borderBottom: '0 solid #ededed',
		paddingBottom: '0.4rem',
		paddingTop: '0.24rem',
		margin: '0 0.24rem 0 0.24rem'
	}
}