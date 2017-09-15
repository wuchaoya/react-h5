/**
 * Created by chao on 2017/9/11.
 */
import React, { Component } from 'react';
import HttpRequest from '../utils/HttpRequest';
import GameTopImg from '../components/GameTopImg';
import Container from './Container';
import GameInfoContail from './GameInfoContailer';
import GameInfoTopContainer from './GameInfoTopContainer';
import GameDetailsIcon from '../components/GameDetailsIcon';
import GameDetailsTopTextContainer from './GameInfoTopTextContainer';
import GameDetailsName from '../components/GameDetailsName';
import GameSize from '../components/GameSize';
import GameDetailsClass from '../components/GameDetailsClass';
import GameDetailsButton from '../components/GameDetailsButton';
import GameInfoStartContainer from './GameInfoStartContainer';
import GameDetailsStartText from '../components/GameDetailsStartText';
import AverageScore from '../components/AverageScore';
import ScrollView from '../components/ScrollView';
import GameDetailSummary from './GameDetailSummaryContainer';
import GameDetailSummaryTitle from '../components/GameDetailsSummaryTitle';
import GameDetailsText from '../components/GameDetailsText';
import GameDetailsOtherContainer from './GameDetailsOtherContainer';
import GameDetailsOtherInfo from '../components/GameDetailsOtherInfo';
import MyModal from '../components/Modal';

export default class LogdingContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      err: false
    };
  }
  render () {
    return this.state.data === null ? null : <Container marginBottom={0}>
      <MyModal />
      <GameTopImg uri={this.state.data.cover} />
      <GameInfoContail>
        <GameInfoTopContainer>
          <GameDetailsIcon src={this.state.data.icon} />
          <GameDetailsTopTextContainer>
            <GameDetailsName>{this.state.data.name}</GameDetailsName>
            <GameSize size={this.state.data.size} />
            <GameDetailsClass data={this.state.data.label} />
          </GameDetailsTopTextContainer>
          <GameDetailsButton
            onClick={() => {
              this.props.history.push('playgame');
            }} />
        </GameInfoTopContainer>
        <GameInfoStartContainer>
          <GameDetailsStartText />
          <AverageScore score={this.state.data.score} />
        </GameInfoStartContainer>
      </GameInfoContail>
      <ScrollView data={this.state.data.images} />
      <GameDetailSummary>
        <GameDetailSummaryTitle>游戏简介</GameDetailSummaryTitle>
        <GameDetailsText>{this.state.data.content}</GameDetailsText>
      </GameDetailSummary>
      <GameDetailsOtherContainer>
        <GameDetailSummaryTitle>其他信息</GameDetailSummaryTitle>
        <GameDetailsOtherInfo name='开发商' text={this.state.data.company} />
        <GameDetailsOtherInfo name='更新日期' text={this.state.data.update_time} />
        <GameDetailsOtherInfo name='版本' text={this.state.data.version} />
      </GameDetailsOtherContainer>

    </Container>;
  };
  getGameDetailsData (gid) {
    this.setState({
      err: false
    });
    HttpRequest.getGameDetailsData({ gid:gid, user_id:null }, (res) => {
      console.log(res);
      this.setState({
        data: res
      });
    }, (err) => {
      console.log(err);
      document.title = '专题详情';
      this.setState({
        data: null,
        err: true
      });
    });
  }
  componentDidMount () {
    this.getGameDetailsData(this.props.match.params.gid);
  }
};

