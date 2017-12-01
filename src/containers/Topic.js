/**
 * Created by chao on 2017/11/28.
 * 专题
 */

import React, {Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/actions';
import Loading from '../components/Loading';
import TopicTop from '../components/TopicTop';
import SwissArmyKnife from '../utils/SwissArmyKnife';
import HttpRequest from '../utils/HttpRequest';
import TopicItem from '../components/TopicItem';

class Topic extends Component {
	
	render() {
		return this.props.stateData.topicData === null ?
			<Loading onClick={() => this.getData()} state={this.props.stateData.topicDataState} /> :
			<div>
				<TopicTop url={this.props.stateData.topicData.cover} text={this.props.stateData.topicData.summary} />
				{this.props.stateData.topicData.game.map((item, index) => {
					return <TopicItem history={this.props.history} key={index} data={item} />
				})}
			</div>
	}
	
	componentWillMount () {
		SwissArmyKnife.setTitle('游戏专题');
		SwissArmyKnife.setColor('#ededed');
		this.getData();
	}
	componentWillUnmount () {
		let { setTopicData } = this.props;
		setTopicData(null, -1);
	}
	
	getData () {
		let { setTopicData } = this.props;
		HttpRequest.getGameDissertationData({ did: this.getDid() }, (res) => {
			setTopicData(res, 0);
		}, (err) => {
			setTopicData(null, 1)
		});
	}
	
	getDid () {
		return SwissArmyKnife.GetQueryString('did') || this.props.history.location.state.did;
	}
}

export default connect(actions.getStateData, actions)(Topic);