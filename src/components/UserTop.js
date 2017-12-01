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
	
	render () {
		return (
			<div style={styles.topContainer}>
				<div style={styles.container} >
					<UserIcon click={this.props.click} login={this.props.login} />
					<UserName click={this.props.click} name={this.props.name} login={this.props.login} />
					{this.props.login ? <UserTime time={this.props.time} login={this.props.login} /> : null}
					<div onClick={this.props.setting} style={styles.iconC}>
						<img style={styles.icon2} src={icon} alt='' />
					</div>
					<div onClick={this.props.goback} style={styles.goback}>
						<img style={styles.gobacksize} src={goback} alt='' />
					</div>
				</div>
			</div>
		)
	}
}

const styles = {
	topContainer: {
		height: '2.7rem',
		backgrounde: '#000',
		display: 'flex',
		justifyContent: 'center',
		position: 'relative'
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