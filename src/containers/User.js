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
	UserTop
} from '../components';

class User extends React.Component {
	
	render () {
		return this.props.stateData.userData === null ?
			<Loading onClick={() => this.getData()} state={this.props.stateData.userDataState} /> :
			<div>
				<UserTop />
			</div>
	}
	
	componentWillMount () {
		SwissArmyKnife.setTitle('我的').setColor('#fff');
	}
	
	getData () {
		let { setUserData } = this.props;
		HttpRequest.serviceList(
			{
				user_id: this.props.isLogin ? this.props.userInfo.id : ''
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