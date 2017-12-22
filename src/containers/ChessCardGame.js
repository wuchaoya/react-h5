/**
 * Created by chao on 2017/11/23.
 * 棋牌游戏
 */

import React, { Component } from 'react';
import bck from '../assets/img/微信端-个人中心_01.jpg';
import buttonIcon from '../assets/img/微信端-个人中心_02.png';
import icon from '../assets/img/微信端-个人中心_03.png';
import HttpRequest from '../utils/HttpRequest';
import WeChat from '../utils/WeChat';
let channelID = '1deb33365f16b5673cdcc65a11fd3057';
let ddzPackageName = 'com.migu.game.cloudddz';

export default class ChessCardGame extends Component {
	constructor (props) {
		super(props);
		this.state = {
			name: '未登录',
			roomCard: '加载中',
			extraId: '',
			openId: '',
			uid: '',
			phone:'',
			userImg: '',
			userId: '123456'
		};
	}
	
	render () {
		return (
			<div style={styles.container}>
				<div style={styles.top}>
					<img style={styles.userIcon} src={this.state.userImg} alt='' />
					<div>
						<h2 style={styles.name}>{this.state.name}</h2>
						<span style={styles.card}>剩余房卡：{this.state.roomCard}</span>
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
						<div
							onClick={() => {
								let data = {
									wxName: this.state.name,
									wxIcon: this.state.userImg,
									openId: this.state.openId,
									userId: this.state.userId,
									uid: this.state.uid,
									phone: this.state.phone,
									roomCard: this.state.roomCard,
									extraId: this.state.extraId,
									pkg: ddzPackageName
								};
								this.props.history.push('qpc', data);
							}}
							style={styles.button}>
							进入游戏
						</div>
					</div>
				</div>
			</div>
		);
	}
	
	componentWillMount () {
		this.initData();
		this.getWeChatInfo();
		this.Wxinit();
		WeChat.readyPlayGame();
	}
	
	initData () {
		window.localStorage.setItem('channelId', this.GetQueryString('channelId'));
	}
	
	getWeChatInfo () {
		console.log('获取code');
		HttpRequest.getWxUserInfo(
			{
				code: this.GetQueryString('code')
			},
			(res) => {
				if (res.errcode === 40163) {
					let data = JSON.parse(window.localStorage.getItem('qpdata'));
					this.setState({
						name: data.name,
						userImg: data.userImg,
						openId: data.openId,
						userId: data.userId,
						uid: data.uid,
						phone: data.phone,
						roomCard: data.roomCard,
						extraId: data.extraId,
						pkg: ddzPackageName,
						channel_id: channelID
					});
					return;
				}
				this.setState({
					name: res.nickname,
					userImg: res.headimgurl,
					openId: res.openid
				});
				this.getUserId(res.openid);
			},
			(err) => {
			}
		);
	}
	
	GetQueryString (name) {
		let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		let r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	}
	
	getUserId (openId) {
		HttpRequest.bindOpenId(
			{
				openid: openId,
				channel_id: channelID
			},
			(res) => {
				console.log(res);
				console.log(res.uid);
				this.setState({
					uid: res.uid,
					userId: res.user_id,
					phone: res.mobile
				});
				this.savaQPData();
				this.getMyService(res.user_id ? res.user_id : res.uid);
			},
			(err) => {
				console.log(err);
			}
		);
	}
	
	selectRoomCardByUserID (userId, services) {
		HttpRequest.selectRoomCard(
			{
				user_id: userId,
				service_id: services,
				pkg: ddzPackageName,
				channel_id: channelID
			},
			(res) => {
				console.log(res);
				this.setState({
					roomCard: res.result_room_card,
					extraId: res.trace_unique_id
				}, () => {
					this.savaQPData();
				});
			},
			(err) => {
				console.log(err);
			}
		);
	}
	
	getMyService (id) {
		HttpRequest.getMyService(
			{
				user_id: id,
				channel_id: channelID
			},
			(res) => {
				if (res.service.length !== 0) {
					let services = [];
					res.service.forEach((item, index) => {
						services.push(item.service_id);
					});
					this.selectRoomCardByUserID(id, services);
				} else {
					this.selectRoomCardByUserID(id, []);
				}
			},
			(err) => {
				this.selectRoomCardByUserID(id, []);
			}
		);
	}
	
	/**
	 * 保存缓存数据
	 */
	savaQPData(){
		let data = {};
		data['name'] = this.state.name;
		data['userImg'] = this.state.userImg;
		data['openId'] = this.state.openId;
		data['userId'] = this.state.userId;
		data['uid'] = this.state.uid;
		data['phone'] = this.state.phone;
		data['roomCard'] = this.state.roomCard;
		data['extraId'] = this.state.extraId;
		data['pkg'] = ddzPackageName;
		window.localStorage.setItem('qpdata', JSON.stringify(data));
	}
	
	
	Wxinit () {
		HttpRequest.getWxConfig(
			{
				activityCode:'123',
				url: encodeURIComponent(window.location.href.split('#')[0])
			},
			(res) => {
				WeChat.init({
					debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: res.appId, // 必填，公众号的唯一标识
					timestamp: res.timestamp, // 必填，生成签名的时间戳
					nonceStr: res.nonceStr, // 必填，生成签名的随机串
					signature: res.signature, // 必填，签名，见附录1
					jsApiList: [
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'closeWindow'
					] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
			},
			(err) => {
			}
		);
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

