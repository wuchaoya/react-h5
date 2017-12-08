/**
 * Created by chao on 2017/12/1.
 */

import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import HttpRequest from '../utils/HttpRequest';
import SwissArmyKnife from '../utils/SwissArmyKnife';
import {
	Loading,
	UserTop,
	Purchase,
	Equity,
	LoginModal
} from '../components';

class User extends React.Component {
	
	render () {
		return this.props.stateData.userData === null ?
			<Loading onClick={() => this.getData()} state={this.props.stateData.userDataState} /> :
			<div>
				<UserTop
					time={this.props.stateData.timeLength}
					name={this.props.stateData.userInfo.name}
					login={this.props.stateData.login}
					history={this.props.history} />
				<Purchase data={this.props.stateData.userData} />
				<Equity data={this.props.stateData.userData} />
				<LoginModal />
			</div>
	}
	
	componentDidMount () {
		SwissArmyKnife.setTitle('我的').setColor('#fff');
		this.getData();
	}
	
	getData () {
		console.log('获取数据')
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
}

export default connect(actions.getStateData, actions)(User);