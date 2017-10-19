/**
 * Created by chao on 2017/9/13.
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import HttpRequest from '../utils/HttpRequest';
import Transition from '../utils/Transition';
import base64 from 'base-64';
import WeChat from '../utils/WeChat';

const Box = styled.div`
  height: ${(props) => props.h / 100}rem;
`;

export default class PlayGameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      err: false,
      roomId: null,
      xml: null,
    };
  }

  render () {
    let height = document.getElementsByTagName('html')[0].clientHeight;
    return (
      <Box id='playGameBox' h={height} />
    );
  }
  Wxinit () {
    console.log('url', encodeURI(window.location.href.split('#')[0]));
    HttpRequest.getWxConfig(
      {
        activityCode:'123',
        url: encodeURI(window.location.href.split('#')[0])
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
  }
  componentWillMount () {
    this.authorize();
  }
  componentDidMount () {
    console.log(this.state.code);
    this.getWxUserInfo(this.GetQueryString('code'));
    document.title = '游戏免下载，即点即玩';
    let pkg = this.getPkg();
    this.init(pkg);
    this.start(pkg);
    this.props.history.listen((location, action) => {
      console.log(location);
      this.Wxinit();
    });
    this.Wxinit();
    WeChat.ready();
    WeChat.error();
  }

  componentWillUnmount () {
    window.location.reload();
    window.Cloudplay.stopSDK();
    console.log('清楚sdk');
  }
  isWeiXin () {
    let ua = window.navigator.userAgent.toLowerCase();
    console.log(ua);
    // eslint-disable-next-line
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }

  getRoomId (pkg) {
    HttpRequest.getRoomId({}, (res) => {
      console.log('新申请房间,清空所有浏览器缓存数据');
      window.localStorage.setItem('MyRoomId', null);
      window.localStorage.setItem('MyId', null);
      window.localStorage.setItem('MyUserId', null);
      this.props.history.replace(
        'playgame?pkg=' + pkg + '&&roomId=' + res.resultData.battleCode + '&&id=' + res.resultData.id + '&&code=' + this.GetQueryString('code')
      );
      this.Wxinit();
      WeChat.ready();
      this.setState({
        roomId: res.resultData.battleCode
      }, () => {
        let userId;
        userId = Number(Math.random().toString(10).substring(2));
        let xml = Transition.JsonToXml({
          root: {
            battle: res.resultData.battleCode,
            user_id: userId
          }
        });
        console.log(xml);
        let gameOptions = {
          appid: 123,
          userinfo: {
            uId: 'user_' + Number(Math.random().toString(10).substring(2)),
            utoken: '12345678'
          },
          priority: 0,
          extraId: 'miguh5',
          pkg_name: pkg,
          playingtime: 1000000,
          configinfo: 'miguh5',
          c_token: 'abcd',
          isPortrait: false,
          payStr: base64.encode(xml)
        };
        window.Cloudplay.startSDK(gameOptions);
        console.log('参数：' + gameOptions.payStr);
        window.localStorage.setItem('MyRoomId', res.resultData.battleCode);
        window.localStorage.setItem('MyId', res.resultData.id);
        window.localStorage.setItem('MyUserId', userId);
      });
    }, (err) => {
      console.log(err);
      console.log('请求失败');
    });
  };

  getPkg () {
    let pkg;
    if (this.props.location.state) {
      pkg = this.props.location.state.pkg;
    } else {
      pkg = this.GetQueryString('pkg');
    }
    return pkg;
  }

  init (pkg) {
    console.log(pkg);
    window.Cloudplay.initSDK({
      accessKeyID: 'D4F92FE4CFC',
      accesskey: '625a706566676a397432573238557444',
      channelId: 100001,
      pkg_name: pkg,
      onSceneChanged: function (sceneId, extraInfo) {
        console.log('sceneId & extraInfo', sceneId, extraInfo);
      },

      MessageHandler: function (message) {
        console.log(message);
      }
    });
  };

  start (pkg) {
    if (pkg === 'com.migu.game.cloudddz') {
      document.title = '咪咕斗地主';
      if (this.GetQueryString('roomId') === null) {
        console.log('1. 地址中没有roomId场景');
        if (window.localStorage.getItem('MyRoomId') &&
          // eslint-disable-next-line
          'null' !== window.localStorage.getItem('MyRoomId') && window.localStorage.getItem('MyId') && 'null' !== window.localStorage.getItem('MyId')) {
          this.setState({
            roomId: window.localStorage.getItem('MyRoomId')
          }, () => {
            // eslint-disable-next-line
            console.log('读取浏览器缓存信息 ' + 'MyRoomId: ' + this.state.roomId +
              ', MyId: ' + window.localStorage.getItem('MyId'));
            this.checkRoomId(window.localStorage.getItem('MyId'), pkg);
          });
        } else {
          console.log('浏览器中不存在缓存信息');
          this.getRoomId(pkg);
        }
      } else {
        console.log('2. 地址中含有roomId场景');
        if ('null' !== this.GetQueryString('roomId') &&
          'null' !== this.GetQueryString('id')) {
          this.setState({
            roomId: this.GetQueryString('roomId')
          }, () => {
            // eslint-disable-next-line
            console.log('读取地址中的房间信息和id信息 ' + 'roomId: ' + this.state.roomId +
              ', id: ' + this.GetQueryString('id'));
            this.checkRoomId(this.GetQueryString('id'), pkg);
          });
        } else {
          console.log('地址中不含有roomid或者id，或者是roomid或id为null')
          this.getRoomId(pkg);
        }
      }
    } else {
      if (this.GetQueryString('uToken') !== null) {
        this.props.history.replace(
          'playgame?pkg=' + pkg + '&&uToken=' + this.GetQueryString('uToken') + '&&code=' + this.GetQueryString('code')
        );
      } else {
        this.props.history.replace(
          'playgame?pkg=' + pkg + '&&code=' + this.GetQueryString('code')
        );
      }
      let gameOptions = {
        appid: 123,
        userinfo: {
          uId: 'user_' + Number(Math.random().toString(10).substring(2)),
          utoken: '12345678'
        },
        priority: 0,
        extraId: 'miguh5',
        pkg_name: pkg,
        playingtime: 1000000,
        configinfo: 'miguh5',
        c_token: 'abcd',
        isPortrait: false
      };
      window.Cloudplay.startSDK(gameOptions);
    }
  };

  GetQueryString (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }

  checkRoomId(id, pkg) {
    HttpRequest.checkRoomId({battleId: id}, (res) => {
        console.log(res);
        if (res.returnCode !== '001') {
          console.log('不可加入约战组!')
          window.localStorage.setItem('MyRoomId', null);
          window.localStorage.setItem('MyId', null);
          window.localStorage.setItem('MyUserId', null);
          this.getRoomId(this.getPkg());
        } else {
          console.log('约战组正常可以加入')
          let xml = Transition.JsonToXml({
            root: {
              battle: this.state.roomId,
              user_id: window.localStorage.getItem('MyUserId') || Number(Math.random().toString(10).substring(2))
            }
          });
          console.log(xml);
          let gameOptions = {
            appid: 123,
            userinfo: {
              uId: 'user_' + Number(Math.random().toString(10).substring(2)),
              utoken: '12345678'
            },
            priority: 0,
            extraId: 'miguh5',
            pkg_name: this.getPkg(),
            playingtime: 1000000,
            configinfo: 'miguh5',
            c_token: 'abcd',
            isPortrait: false,
            payStr: base64.encode(xml)
          };
          window.Cloudplay.startSDK(gameOptions);
          this.props.history.replace(
            'playgame?pkg=' + pkg + '&&roomId=' + this.state.roomId + '&&id=' + id + '&&code=' + this.GetQueryString('code')
          );
          this.Wxinit();
          WeChat.ready();
        }
      }, (err) => {
        console.log(err);
      }
    );
  }
  authorize () {
    if (this.isWeiXin()) {
      let pkg = this.getPkg();
      if (pkg === 'com.migu.game.cloudddz') {
        if (!this.GetQueryString('code')) {
          let url = window.location.href;
          if (this.props.location.state) {
            if (this.props.location.state.pkg) {
              url = url + '?pkg=' + this.props.location.state.pkg;
            }
          }
          window.location.href = 'http://migugame.cmgame.com/gulu/' +
            'wechat/capacity/getWxCodeInfo?redirectUrl=' + url;
        }
      }
    }
  }
  getWxUserInfo (code) {
    HttpRequest.getWxUserInfo(
      { code: code },
      (res) => {
        console.log('微信用户信息');
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
};
