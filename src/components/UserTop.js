/**
 * Created by chao on 2017/12/1.
 */

import * as React from 'react';

import {
	UserIcon,
	UserName,
	UserTime
} from '../components';

import icon from '../assets/img/icon-setting.png';
import goback from '../assets/img/back.png';

export default class UserTop extends React.Component {
	
	constructor (props) {
		super (props);
		this.historyPush = this.historyPush.bind(this);
		this.goBack = this.goBack.bind(this);
		this.setting = this.setting.bind(this);
	}
	
	render () {
		console.log(this.props)
		return (
			<div style={styles.topContainer}>
				<div style={styles.container} >
					<UserIcon onClick={this.historyPush} login={this.props.login} />
					<UserName onClick={this.historyPush} name={this.props.name || '未登录'} login={this.props.login} />
					{this.props.login ? <UserTime time={this.props.time} login={this.props.login} /> : null}
					<div onClick={this.setting} style={styles.iconC}>
						<img style={styles.icon2} src={icon} alt='' />
					</div>
					<div onClick={this.goBack} style={styles.goback}>
						<img style={styles.gobacksize} src={goback} alt='' />
					</div>
				</div>
			</div>
		)
	}
	historyPush() {
		if (this.props.login) {
			return
		}
		this.props.history.push('signIn');
	}
	
	goBack () {
		this.props.history.goBack();
	}
	
	setting () {
		this.props.history.push('setting');
	}
}

const styles = {
	topContainer: {
		height: '2.7rem',
		background: '#000',
		display: 'flex',
		justifyContent: 'center',
		position: 'relative',
	},
	container: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	icon:{
		width:'0.5rem',
		height:'0.5rem'
	},
	icon2:{
		width:'0.4rem',
		height:'0.4rem'
	},
	iconC: {
		position: 'absolute',
		right:'0.3rem',
		top:'0.3rem'
	},
	goback: {
		position: 'absolute',
		left:'0rem',
		top:'0.24rem'
	},
	gobacksize: {
		width:'0.66rem',
		height:'0.66rem'
	}
};