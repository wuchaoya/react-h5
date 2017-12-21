/**
 * Created by chao on 2017/12/1.
 */

import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import HttpRequest from '../utils/HttpRequest';
import SwissArmyKnife from '../utils/SwissArmyKnife';
import DesUtils from '../utils/DesUtils';
import {
	Loading,
	UserTop,
	Purchase,
	Equity,
	LoginModal
} from '../components';

class User extends React.Component {
	
	constructor (props) {
		super (props);
		this.state = {
			showLoginModal: false // 是否显示未登陆提示
		}
		this.ypPay = this.ypPay.bind(this);
	}
	render () {
		return this.props.stateData.userData === null ?
			<Loading onClick={() => this.getData()} state={this.props.stateData.userDataState} /> :
			<div>
				
				<UserTop
					time={this.props.stateData.timeLength}
					name={this.props.stateData.userInfo.name}
					login={this.props.stateData.login}
					history={this.props.history} />
				
				<Purchase
					MyServiceId={this.props.stateData.MyServiceId}
					data={this.props.stateData.userData}
					onClick={this.ypPay}
				/>
				
				<Equity data={this.props.stateData.userData} />
				
				<LoginModal
					state={this.state.showLoginModal}
					onCancel={() => this.setState({ showLoginModal: false })}
					history={this.props.history} />
				
			</div>
	}
	
	componentDidMount () {
		SwissArmyKnife.setTitle('我的');
		SwissArmyKnife.setColor('#fff');
		this.getData();
	}
	
	/**
	 * 获取包月列表数据
	 */
	getData () {
		let { setUserData } = this.props;
		HttpRequest.serviceList(
			{
				user_id: this.props.stateData.isLogin ? this.props.stateData.userInfo.id : ''
			},
			(res) => {
				setUserData(res, 0);
				this.props.getServiceData(res);
			},
			(err) => {
				setUserData(null, 1);
			}
		);
	}
	
	/**
	 * 获取包月url
	 * @param obj
	 */
	ypPay (obj) {
		let key = '625a706566676a397432573238557444';
		if (!this.props.stateData.login) {
			this.setState({
				showLoginModal: true
			});
			return;
		}
		
		HttpRequest.ygPay(
			{
				uId: this.props.stateData.userInfo.id,
				channelCode: obj.channel_code,
				monthStatus: '1',
				productDescribe: obj.prodect_describe,
				serviceID: obj.service_id,
				spCode: obj.sp_code,
				etel: DesUtils.desencry(key, this.props.stateData.userInfo.name),
				cloudgame: '1',
				tag: encodeURIComponent(window.location.origin + '/home')
			},
			(res) => {
				let url = res.yg_url;
				if (SwissArmyKnife.isIos()) {
					window.location.href = url;
					window.localStorage.setItem('openVIP', true);
					return;
				}
				this.setState(
					{
						src: url,
						openView: true
					}
				);
			},
			(err) => {
				console.log(err);
			}
		);
	}
}

export default connect(actions.getStateData, actions)(User);