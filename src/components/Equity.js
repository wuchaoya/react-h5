/**
 * Created by chao on 2017/12/4.
 * 会员购买
 
 */

import * as React from 'react';

import {
	Text,
	EquityIcon,
	EquityText
} from '../components';

import SwissArmyKnife from '../utils/SwissArmyKnife';

export default class Equity extends React.Component {
	
	render () {
		return (
			<div style={styles.container}>
				<Text margin='0.52rem 0 0.18rem 0.24rem' color='#000' size={0.3} text='会员权益' />
				{SwissArmyKnife.clone(this.props.data).reverse().map((item, index) => {
					return <div style={styles.item} key={index}>
						<EquityIcon name={item.prodect_title} />
						<EquityText>
							{item.prodect_describe}
						</EquityText>
					</div>;
				})}
			</div>
		)
	}
}

const styles = {
	item: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		borderBottom: '0.01rem solid #ededed',
		paddingBottom: '0.4rem',
		paddingTop: '0.24rem',
		margin: '0 0.24rem 0 0.24rem'
	},
container: {
		background: '#fff'
	}
}