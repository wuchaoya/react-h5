/**
 * Created by chao on 2017/9/25.
 * 首页
 */

import React, { Component } from 'react';

import Container from './Container';
import HttpRequest from '../utils/HttpRequest';
import LoadingContainer from './LoadingContainer';
import HomeFours from '../components/HomeFours';
import HomeTopic from './HomeTopic';
import Title from '../components/Title';
import ScrollView from '../components/HomeScroll';
import ChosenGame from './ChosenGameContainer';
import HomeChosenGameTop from './HomeChosenGameTop';
import IconRight from '../components/IconRight';
import HomeChoseGameRight from './HomeChosenGameRight';
import ChosenGameScroll from '../components/ChosenGameScroll';
import WeChat from '../utils/WeChat';

class PlayGameContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      err: false
    };
  }
  render () {
    // eslint-disable-next-line
    return this.state.data === null ? <LoadingContainer name='首页'clickButton={() => this.getData()} err={this.state.err} /> : <Container marginBottom={0.24}>
      <HomeFours click={(gid) => {
        this.props.history.push('gamedetails' + gid);
      }} data={this.state.data.banner} />
      <HomeTopic>
        <Title margin='0.24rem 0 0 0.24rem' color='#000' fontSize='0.3rem'>游戏专题</Title>
        <Title margin='0.24rem 0 0 0.24rem' color='#999' fontSize='0.24rem'>ACT ACT 我们为你挑好了</Title>
        <ScrollView click={(did) => {
          console.log('点击了');
          this.props.history.push('/topic?did=' + did);
        }} data={this.state.data.dissertation} />
      </HomeTopic>
      <ChosenGame>
        <HomeChosenGameTop>
          <Title margin='0.24rem 0 0 0.24rem' color='#000' fontSize='0.3rem'>游戏精选</Title>
          <HomeChoseGameRight onClick={() => {
            this.props.history.push('gamelist');
          }
          }>
            <Title margin='0.24rem 0 0 0.24rem' color='#83b233' fontSize='0.24rem'>
              更多
            </Title>
            <IconRight fontSize='0.3rem' color='#83b233' />
          </HomeChoseGameRight>
        </HomeChosenGameTop>
        <ChosenGameScroll click={(gid) => {
          this.props.history.push('gamedetails' + gid);
        }} data={this.state.data.gameList} />
      </ChosenGame>
    </Container>;
  }
  getData () {
    this.setState({
      err: false
    });
    HttpRequest.getHomeData({}, (res) => {
      document.title = '首页';
      console.log(res);
      this.setState({
        data: res
      });
    }, (err) => {
      document.title = '首页';
      console.log(document.title);
      this.setState({
        data: null,
        err: true
      });
    });
  }
  componentDidMount () {
    this.props.history.listen((location, action) => {
      console.log(location);
    });
    HttpRequest.getWxConfig(
      {
        activityCode:'123',
        url: window.location.href.split('#')[0]
      },
      (res) => {
        console.log(res);
        WeChat.init({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
    WeChat.ready();
    WeChat.error();
    this.getData();
  }
}

export default PlayGameContainer;

