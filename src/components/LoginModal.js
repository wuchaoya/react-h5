/**
 * Created by chao on 2017/10/26.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {ComponentModal} from '../components';
import * as actions from '../actions/actions';


class LoginModal extends Component {
	render () {
		return (
      <ComponentModal
	      onCancel={() => {
	      
	      }}
	      onConfirm={() => {}}
	      title='您尚未登录，是否登录' />
		);
	}
};

export default connect(actions.getStateData, actions)(LoginModal);