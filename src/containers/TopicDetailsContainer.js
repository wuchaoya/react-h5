import React, { Component } from 'react';

import Container from './Container';
import HttpRequest from '../utils/HttpRequest';
import TopIme from '../components/TopImg';
import TopicContainer from './TopicContainer';
import HeadImg from '../components/HeadImg';
import HeadTitle from '../components/HeadTitle';
import HeadContainer from './HeadContainer';
import HeadLeftContainer from './HeadLeftContainer';
import HeadLeftBottomContainer from './HeadLeftBottom';
import GameClass from '../components/GameClass';
import Star from '../components/Star';
import GameDetaillImg from '../components/GameDetailImg';
import GameIntro from '../components/GameIntro';
import TopIntro from '../components/TopIntro';
/* import HeadNav from '../components/HeadNav'; */
import PlayGameButton from '../components/PlayGameButton';
import LoadingContainer from './LoadingContainer';

class PlayGameContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      err: false
    };
  }
  render () {
    return this.state.data === null ? <LoadingContainer clickButton={() => this.getData()} err={this.state.err} /> : <Container>
      {/* <HeadNav opacity={1}>{this.state.data.title}</HeadNav> */}
      <TopIme uri={this.state.data.cover} />
      <TopIntro>{this.state.data.summary}</TopIntro>
      {this.state.data.game.map((item, index) => {
        return (
          <TopicContainer key={index}>
            <HeadContainer>
              <HeadImg uri={item.icon} />
              <HeadLeftContainer>
                <HeadTitle>{item.name}</HeadTitle>
                <HeadLeftBottomContainer>
                  {item.label.map((item, index) => {
                    return (<GameClass key={index} name={item} />);
                  })}
                  <Star index={item.pkg} key={item.pkg} length={item.score} />
                </HeadLeftBottomContainer>
              </HeadLeftContainer>
              <PlayGameButton>立即玩</PlayGameButton>
            </HeadContainer>
            <GameDetaillImg width='100%' height='100%' src={item.cover}
                            onClick={() => {
                              console.log(this.props.history.push(item.gid))
                            }}/>
            <GameIntro>{item.game_summary}</GameIntro>
          </TopicContainer>
        );
      })}
    </Container>;
  }
  GetQueryString (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }

  getData () {
    this.setState({
      err: false
    });
    HttpRequest.getGameDissertationData({ did:this.GetQueryString('did') }, (res) => {
      document.title = res.title;
      this.setState({
        data: res
      });
    }, (err) => {
      document.title = '专题详情';
      this.setState({
        data: null,
        err: true
      });
    });
  }
  componentDidMount () {
    this.getData();
  }
}

export default PlayGameContainer;
