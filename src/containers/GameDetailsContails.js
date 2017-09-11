/**
 * Created by chao on 2017/9/11.
 */
import React, { Component } from 'react';
import HttpRequest from '../utils/HttpRequest';
import GameTopImg from '../components/GameTopImg';
import LoadingContainer from './LoadingContainer';
import Container from './Container';
import GameInfoContail from './GameInfoContailer';
import GameInfoTopContainer from './GameInfoTopContainer';
import GameDetailsIcon from '../components/GameDetailsIcon';
import GameDetailsTopTextContainer from './GameInfoTopTextContainer';
import GameDetailsName from '../components/GameDetailsName';
export default class LogdingContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      err: false
    };
  }
  render () {
    return this.state.data === null ? <LoadingContainer /> : <Container>
      <GameTopImg uri={this.state.data.cover} />
      <GameInfoContail>
        <GameInfoTopContainer>
          <GameDetailsIcon src={this.state.data.icon} />
          <GameDetailsTopTextContainer>
            <GameDetailsName>{this.state.data.name}</GameDetailsName>
          </GameDetailsTopTextContainer>
        </GameInfoTopContainer>
      </GameInfoContail>
    </Container>;
  }
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

