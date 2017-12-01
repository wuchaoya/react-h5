/**
 * Created by chao on 2017/11/29.
 * 游戏专题
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import Loading from '../components/Loading';
import HttpRequest from '../utils/HttpRequest';
import Video from '../components/Video';
import SwissArmyKnife from '../utils/SwissArmyKnife';
import GameInfo from '../components/GameInfo';
import TransformScrollView from '../components/TransformScrollView';
import DetailSummary from '../components/DetailSummary';
import DetailsOther from '../components/DetailsOther';

class GameDetails extends Component {
	
	render () {
		return this.props.stateData.gameDetailsData === null ?
			<Loading
				onClick={() => this.getData()}
				state={this.props.stateData.gameDetailsDataState} /> :
			<div>
				<Video
					img={this.props.stateData.gameDetailsData.cover}
					video={this.props.stateData.gameDetailsData.video_url} />
				<GameInfo data={this.props.stateData.gameDetailsData} />
				<TransformScrollView data={this.props.stateData.gameDetailsData.images} />
				<DetailSummary data={this.props.stateData.gameDetailsData} />
				<DetailsOther data={this.props.stateData.gameDetailsData} />
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
	
}

export default connect(actions.getStateData, actions)(GameDetails);