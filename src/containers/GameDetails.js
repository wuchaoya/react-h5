/**
 * Created by chao on 2017/11/29.
 * 游戏专题
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	Loading,
	Video,
	GameInfo,
	TransformScrollView,
	DetailSummary,
	DetailsOther,
	ImgModal
} from '../components';

import * as actions from '../actions/actions';
import HttpRequest from '../utils/HttpRequest';
import SwissArmyKnife from '../utils/SwissArmyKnife';

class GameDetails extends Component {
	
	constructor (props) {
		super (props);
		SwissArmyKnife.historyPush.bind(this);
		this.setIndex = this.setIndex.bind(this);
		this.state = {
			showModal: false,
			index: 0
		}
	}
	
	render () {
		return this.props.stateData.gameDetailsData === null ?
			<Loading
				onClick={() => this.getData()}
				state={this.props.stateData.gameDetailsDataState} /> :
			<div>
				
				<Video
					img={this.props.stateData.gameDetailsData.cover}
					video={this.props.stateData.gameDetailsData.video_url} />
				
				<GameInfo
					onClick={() => SwissArmyKnife.historyPush('playgame',
						{pkg:this.props.stateData.gameDetailsData.pkg}, this)}
					data={this.props.stateData.gameDetailsData} />
				
				<TransformScrollView
					data={this.props.stateData.gameDetailsData.images}
				  onClick={(index) => this.setIndex(index)}
				/>
				
				<DetailSummary data={this.props.stateData.gameDetailsData} />
				
				<DetailsOther data={this.props.stateData.gameDetailsData} />
				
				{ this.state.showModal ?
					<ImgModal
						onClick={() => this.setShowModal(false)}
						index={this.state.index}
						data={this.props.stateData.gameDetailsData.images} />
					: null
				}
				
			</div>
	}
	
	componentWillMount () {
		SwissArmyKnife.setTitle('游戏详情').setColor('#ededed');
		this.getGameDetailsData();
	}
	
	componentWillUnmount () {
		let { setGameDetailsData } = this.props;
		setGameDetailsData(null, -1);
	}
	
	getGameDetailsData () {
		let { setGameDetailsData } = this.props;
		HttpRequest.getGameDetailsData({
			gid:this.props.history.location.state.gid,
			user_id: this.props.stateData.userInfo.id
		}, (res) => {
			setGameDetailsData(res, 0);
		}, (err) => {
			setGameDetailsData(null, -1);
		});
	}
	
	setIndex (index) {
		console.log(index);
		this.setState({
			index: index
		}, this.setShowModal(true));
	}
	
	setShowModal (bool) {
		this.setState({
			showModal: bool
		})
	}
	
}

export default connect(actions.getStateData, actions)(GameDetails);