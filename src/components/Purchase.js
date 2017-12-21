/**
 * Created by chao on 2017/12/1.
 */

import * as React from 'react';

import {
	Text,
	PurchaseItem
} from '../components';

import SwissArmyKnife from '../utils/SwissArmyKnife'

export default class Purchase extends React.Component {
	
	render () {
		return (
			<div style={styles.container}>
				<Text margin='0.52rem 0 0.12rem 0.24rem' color='#000' size={0.3} text='会员购买' />
				{this.props.data.map((item, index) => {
					return (
						<PurchaseItem
							MyServiceId={this.getServiceId(item.service_id)}
							isRecommend={index === 1}
							data={item}
							key={index}
							onClick={() => this.props.onClick(item)}
						/>
					)
				})}
			</div>
		)
	}
	
	/**
	 * 获取已开通id
	 * @returns {string}
	 */
	getServiceId (id) {
		let index = SwissArmyKnife.indexOf(id, this.props.MyServiceId);
		let serviceId = index === -1 ? '' : this.props.MyServiceId[index];
		return serviceId;
	}
}

const styles = {
	container: {
		background: '#fff',
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