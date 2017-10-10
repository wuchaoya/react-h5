/**
 * Created by chao on 2017/9/13.
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import HttpRequest from '../utils/HttpRequest';
import Transition from '../utils/Transition';
import base64 from 'base-64';

const Box = styled.div`
  height: ${(props) => props.h / 100}rem;
`;

export default class PlayGameContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      err: false,
      roomId: null,
      xml: null
    };
  }

  render () {
    let height = document.getElementsByTagName('html')[0].clientHeight;
    return (
      <Box id='playGameBox' h={height} />
    );
  }

  componentDidMount () {
    document.title = '游戏免下载，点击立即玩';
    let pkg = this.getPkg();
    this.init(pkg);
    this.start(pkg);
  }
  componentWillUnmount () {
    window.location.reload();
    window.Cloudplay.stopSDK();
  }

  /**
   * 获取房间号,只针对咪咕棋牌游戏有效
   * atob
   */
  getRoomId (pkg) {
    HttpRequest.getRoomId({}, (res) => {
      console.log(this.props.history)
      this.props.history.replace(
        'playgame?pkg=' + pkg + '&&roomId=' + res.resultData.battleCode + '&&id=' + res.resultData.id
      );
      this.setState({
        roomId: res.resultData.battleCode
      }, () => {
        let userId;
        if (window.localStorage.getItem('MyuserId')) {
          userId = window.localStorage.getItem('MyuserId');
        } else {
          userId = Number(Math.random().toString(10).substring(2));
          window.localStorage.setItem('MyuserId', userId);
        }
        console.log('userid', userId, window.localStorage.getItem('MyuserId'));
        let xml = Transition.JsonToXml({
          root: {
            battle: this.state.roomId,
            user_id: Number(Math.random().toString(10).substring(2))
          }
        });
        let gameOptions = {
          appid: 123,
          userinfo: {
            uId: 'user_' + Number(Math.random().toString(10).substring(2)),
            utoken: '12345678'
          },
          priority: 0,
          extraId: 'miguh5',
          pkg_name: pkg,
          playingtime: 600000,
          configinfo: 'miguh5',
          c_token: 'abcd',
          isPortrait: false,
          payStr: base64.encode(xml)
        };
        window.Cloudplay.startSDK(gameOptions);
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
      if (this.GetQueryString('roomId') === null) {
        console.log('没');
        this.getRoomId(pkg);
      } else {
        console.log('有');
        this.checkRoomId(this.GetQueryString('id'));
      }
    } else {
      let gameOptions = {
        appid: 123,
        userinfo: {
          uId: 'user_' + Number(Math.random().toString(10).substring(2)),
          utoken: '12345678'
        },
        priority: 0,
        extraId: 'miguh5',
        pkg_name: pkg,
        playingtime: 600000,
        configinfo: 'miguh5',
        c_token: 'abcd',
        isPortrait: false
      };
      window.Cloudplay.startSDK(gameOptions);
      if (this.GetQueryString('uToken') === null){
        this.props.history.replace(
          'playgame?pkg=' + this.GetQueryString('pkg')
        );
      } else {
        this.props.history.replace(
          'playgame?pkg=' + this.GetQueryString('pkg') + '&&uToken=' + this.GetQueryString('uToken')
        );
      }
    }
  }
  GetQueryString (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }
  checkRoomId (id) {
    HttpRequest.checkRoomId({ battleId:id }, (res) => {
      console.log(res);
      if (res.returnCode !== '001') {
        this.getRoomId(this.getPkg());
      } else {
        let userId;
        if (window.localStorage.getItem('MyuserId')) {
          userId = window.localStorage.getItem('MyuserId');
        } else {
          userId = Number(Math.random().toString(10).substring(2));
          window.localStorage.setItem('MyuserId', userId);
        }
        console.log('userid', userId, window.localStorage.getItem('MyuserId'));
        let xml = Transition.JsonToXml({
          root: {
            battle: this.GetQueryString('roomId'),
            user_id: Number(Math.random().toString(10).substring(2))
          }
        });
        let gameOptions = {
          appid: 123,
          userinfo: {
            uId: 'user_' + Number(Math.random().toString(10).substring(2)),
            utoken: '12345678'
          },
          priority: 0,
          extraId: 'miguh5',
          pkg_name: this.getPkg(),
          playingtime: 600000,
          configinfo: 'miguh5',
          c_token: 'abcd',
          isPortrait: false,
          payStr: base64.encode(xml)
        };
        window.Cloudplay.startSDK(gameOptions);
      }
    }, (err) => {
      console.log(err);
    }
    );
  }
};

