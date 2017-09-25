/**
 * Created by chao on 2017/9/11.
 * 游戏详情页
 */
import React, { Component } from 'react';
import HttpRequest from '../utils/HttpRequest';
// import GameTopImg from '../components/GameTopImg';
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
import MyStart from '../components/MyStart';
import MyVideo from '../components/Video';

export default class LogdingContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      err: false,
      imgdisable:true,
      index:0
    };
  }
  render () {
    return this.state.data === null ? null : <Container marginBottom={0}>
      {this.state.imgdisable ? null : <MyModal index={this.state.index} click={() => {
        this.setState(
          {
            imgdisable:true
          });
      }
      } disabled={this.state.imgdisable} data={this.state.data.images} />}
      <MyVideo img={this.state.data.cover} video={this.state.data.video_url} />
      {/* <GameTopImg uri={this.state.data.cover} /> */}
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
              this.props.history.push('playgame', { pkg:this.state.data.pkg });
            }} />
        </GameInfoTopContainer>
        <GameInfoStartContainer>
          <GameDetailsStartText />
          <MyStart length={1} />
          <AverageScore score={this.state.data.score} />
        </GameInfoStartContainer>
      </GameInfoContail>
      <ScrollView click={(index) => {
        this.setState({
          index:index
        }, () => {
          this.setState({
            imgdisable:false
          });
        });
      }} data={this.state.data.images} />
      <GameDetailSummary>
        <GameDetailSummaryTitle>游戏简介</GameDetailSummaryTitle>
        <GameDetailsText ref='infoText' data={this.state.data.content} />
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
  getTextHeight () {
  }
  componentDidMount () {
    this.getGameDetailsData(this.props.match.params.gid);
    this.getTextHeight();
  }
};

