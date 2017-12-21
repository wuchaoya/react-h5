/**
 * Created by chao on 2017/10/26.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {ComponentModal} from '../components';
import * as actions from '../actions/actions';
import SwissArmyKnife from '../utils/SwissArmyKnife';


class LoginModal extends Component {
	constructor (props) {
		super (props);
		SwissArmyKnife.historyPush = SwissArmyKnife.historyPush.bind(this);
	}
	render () {
		return (
			<div>
				{ !this.props.state ? null :
					<ComponentModal
						onCancel={this.props.onCancel}
						onConfirm={() => SwissArmyKnife.historyPush('/signIn')}
						title='您尚未登录，是否登录' />
				}
				
			</div>
		);
	}
};

export default connect(actions.getStateData, actions)(LoginModal);