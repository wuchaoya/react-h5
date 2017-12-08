/**
 * Created by chao on 2017/11/23.
 * 棋牌游戏
 */

import React, { Component } from 'react';

import bck from '../assets/img/微信端-个人中心_01.jpg';
import buttonIcon from '../assets/img/微信端-个人中心_02.png';
import icon from '../assets/img/微信端-个人中心_03.png';
import HttpRequest from '../utils/HttpRequest';

export default class ChessCardGame extends Component {
	render () {
		return (
      <div style={styles.container}>
        <div style={styles.top}>
          <img style={styles.userIcon} src='' alt='' />
          <div>
            <h2 style={styles.name}>小咪咕</h2>
            <span style={styles.card}>剩余房卡：x</span>
          </div>
        </div>
        <div style={styles.itemContainer}>
          <div style={styles.item}>
            <div style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems:'center'
						}}>
              <img style={styles.icon} src={icon} alt='' />
              <span>咪咕斗地主</span>
            </div>
            <div style={styles.button}>
              进入游戏
            </div>
          </div>
        </div>
      </div>
		);
	}
	getId () {
		HttpRequest.bindOpeniId(
			{
				channel_id: '',
				openid: ''
			},
			(res) => {
			
			},
			(err) => {
			
			}
		)
	}
};

const styles = {
	container: {
		width: '7.2rem',
		height: '12.08rem',
		background: 'url(' + bck + ')',
		backgroundSize: '100% 100%'
	},
	top: {
		display: 'flex',
		flexDirection: 'row',
		paddingTop: '0.6rem',
		paddingLeft: '0.6rem',
		alignItems: 'center',
		marginBottom: '1.5rem'
	},
	userIcon: {
		width: '1rem',
		height: '1rem',
		backgroundColor: '#94d',
		marginRight: '0.2rem',
		borderRadius: '0.29rem'
	},
	name: {
		fontSize: '0.3rem',
		color: '#000',
		margin: '0',
		padding: '0'
	},
	card: {
		fontSize: '0.24rem',
		color: '#fff'
	},
	itemContainer: {
		marginTop: '1.2rem',
		height: '1.2rem',
		background: '#ededed',
		margin: '0.42rem 0.6rem 0.42rem 0.6rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '0.6rem',
		paddingLeft: '0.1rem',
		paddingRight: '0.1rem'
	},
	item: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent:'space-between',
		width: '6rem'
	},
	icon: {
		width: '1rem',
		height: '1rem',
		backgroundColor: '#94d',
		borderRadius: '50%',
		marginRight: '0.1rem'
	},
	title: {
		fontSize: '0.26rem',
		color: '#000'
	},
	button: {
		width: '2.26rem',
		height: '0.6rem',
		borderRadius:  '0.3rem',
		background: 'url(' + buttonIcon + ')',
		backgroundSize: '2.26rem 0.6rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#fff'
	}
};

