/*
  游戏专题
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
import PlayGameButton from '../components/PlayGameButton';
import LoadingContainer from './LoadingContainer';
import WeChat from '../utils/WeChat';
import ErrModal from '../components/ErrModal';

import { getTimeLength } from '../actions/actions';

class PlayGameContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      err: false,
      loginModal: false,
      noTime: false
    };
  }
  render () {
    return this.state.data === null ? <LoadingContainer name='游戏专题'clickButton={() => this.getData()} err={this.state.err} /> : <Container
      marginBottom={0.24}>
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
              <PlayGameButton onClick={() => {
                if (!this.props.isLogin) {
                  this.setState({
                    loginModal: true
                  });
                  return;
                }
                this.getTimeLength(item.pkg);
              }}>立即玩</PlayGameButton>
            </HeadContainer>
            <GameDetaillImg width='100%' height='100%' src={item.cover}
                            onClick={() => {
                              this.props.history.push('gamedetails' + item.gid);
                            }} />
            <GameIntro>{item.game_summary}</GameIntro>
          </TopicContainer>
        );
      })}
      {this.state.loginModal ? <ErrModal
        title='您尚未登陆，是否登陆'
        onConfirm={() => {
          this.props.history.push('/signin', { key: this.props.location.key });
        }}
        onCancel={() => {
          this.setState({
            loginModal: false
          });
        }} /> : null}
      {this.state.noTime ? <ErrModal
        title='剩余时间不足，是否购买'
        onConfirm={() => {
          this.props.history.push('/user', { key: this.props.location.key });
        }}
        onCancel={() => {
          this.setState({
            noTime: false
          });
        }} /> : null}
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
  init () {
    HttpRequest.getWxConfig(
      {
        activityCode:'123',
        url: window.location.href.split('#')[0]
      },
      (res) => {
        WeChat.init({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名，见附录1
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  componentDidMount () {
    this.getData();
    this.props.history.listen((location, action) => {
      console.log(location);
      this.init();
    });
    this.init();
    WeChat.ready();
    WeChat.error();
  }
  getTimeLength (pkg) {
    HttpRequest.getTimeLength(
      {
        user_id: this.props.userInfo.id,
        service_id:[this.props.MyServiceId],
        pkg:pkg
      },
      (res) => {
        console.log('游戏时长');
        console.log(res);
        this.props.getTimeLength(Number(res.result_time));
        if (Number(res.result_time === 0)) {
          this.setState({
            noTime: true
          });
        } else {
          this.props.history.push('playgame', { pkg:pkg });
        }
      },
      (err) => {
        console.log(err);
        this.props.history.push('playgame', { pkg:pkg });
      }
    );
  }

}
const getState = state => {
  return {
    isLogin: state.update.login,
    timeLength: state.update.timeLength,
    userInfo: state.update.userInfo,
    MyServiceId: state.update.MyServiceId
  };
};

export default connect(getState, { getTimeLength })(PlayGameContainer);

