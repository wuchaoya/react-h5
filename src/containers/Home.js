/**
 * Created by chao on 2017/11/27.
 * 首页
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import HttpRequest from '../utils/HttpRequest';
import SwissArmyKnife from '../utils/SwissArmyKnife';

import {
	Loading,
	HomeFours,
	HomeTopic,
	FeaturedGames,
	UserButton
} from '../components';


class Home extends Component {
	constructor (props) {
		super(props);
		this.state = {
		};
	}
	render () {
		return this.props.stateData.homeData === null ?
			<Loading onClick={() => this.getData()} state={this.props.stateData.homeDataState} /> :
			<div style={{backgroundColor: '#ededed'}}>
				
				<HomeFours
					click={(gid) => this.historyPush('gamedetails', {gid: gid})}
					data={this.props.stateData.homeData.banner}
				/>
				
				<HomeTopic
					onClick={(index) => {
						this.historyPush('topic', {did: this.props.stateData.homeData.dissertation[index].did})
					}}
					autoplay={false}
					dataList={this.props.stateData.homeData.dissertation} />
				
				<FeaturedGames
					onClick={(index) => this.historyPush('gamedetails', {gid: this.props.stateData.homeData.banner[index].gid})}
					autoplay={false}
					onClickButton={() => this.historyPush('gamelist')}
					dataList={this.props.stateData.homeData.gameList} />
				
				<UserButton login={this.props.stateData.login} onClick={() => this.historyPush('user')} />
			</div>;
	}
	
	/**
	 * 设置title body颜色 获取数据
	 */
	componentDidMount () {
		SwissArmyKnife.setTitle('首页').setColor('#fff');
		SwissArmyKnife.initWeChat();
		this.getData();
	}
	
	/**
	 * 路由跳转
	 * @param path
	 * @param data
	 */
	historyPush (path,data) {
		this.props.history.push(path, data);
	}
	
	/**
	 * 获取数据
	 */
	getData () {
		let { setHomeData } = this.props;
		HttpRequest.getHomeData({}, (res) => {
			setHomeData(res, 0);
		}, (err) => {
			setHomeData(null, 1)
		});
	}
	
	/**
	 * 校验token
	 */
	checkToken () {
		if (SwissArmyKnife.GetQueryString('channelID') !== '40129731334') {
			return;
		}
		HttpRequest.validateToken(
			{
				token: encodeURIComponent(SwissArmyKnife.GetQueryString('uToken')),
				channelId: '40129731334'
			},
			(res) => {
				// 自登录相关逻辑
				this.loginQuick(res.msisdn);
			},
			(err) => {
				console.log('token实效了');
			}
		);
	}
	
	/**
	 * token免登
	 */
	loginQuick (phone) {
		HttpRequest.loginQuick(
			{ phone: phone,
				channelId: '40129731334'
			},
			(res) => {
				console.log(res);
				if (res.resultCode === 0) {
					this.props.login({
						id:res.implicitLoginRsp.userInfo.identityID,
						name:res.phone
					});
					SwissArmyKnife.getMyService(res.implicitLoginRsp.userInfo.identityID,this);
				}
			},
			(err) => {
				console.log(err);
			}
		);
	}
	
}

export default connect(actions.getStateData, actions)(Home);