/**
 * Created by chao on 2017/9/13.
 */
import React, {Component} from 'react';
import styled from 'styled-components';
import HttpRequest from '../utils/HttpRequest';
import Transition from '../utils/Transition';
import base64 from 'base-64';

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
      xml: null
    };
  }

  render() {
    let height = document.getElementsByTagName('html')[0].clientHeight;
    return (
      <Box id='playGameBox' h={height}/>
    );
  }

  componentDidMount() {
    console.log(this.props.location.state)
    if (this.props.location.state.pkg == 'com.migu.game.ddzzr') {
      console.log('哈哈++++斗地主游戏-------')
      this.getRoomId();
    } else {
      console.log('哈哈+++++=不是斗地主游戏-------')
      let gameOptions = {
        appid: 123,
        userinfo: {
          uId: '1234',
          utoken: '12345678'
        },
        priority: 0,
        extraId: 'miguh5',
        pkg_name: this.props.location.state.pkg,
        playingtime: 600000,
        configinfo: 'miguh5',
        c_token: 'abcd',
        isPortrait: false
      };
      window.Cloudplay.startSDK(gameOptions);
    }
    window.Cloudplay.initSDK({
      accessKeyID: 'D4F92FE4CFC',
      accesskey: '625a706566676a397432573238557444',
      channelId: 100001,
      pkg_name: this.props.location.state.pkg,
      onSceneChanged: function (sceneId, extraInfo) {
        console.log('sceneId & extraInfo', sceneId, extraInfo);
      },

      MessageHandler: function (message) {
        console.log(message);
      }
    });

  }

  componentWillUnmount() {
    window.location.reload();
    window.Cloudplay.stopSDK();
  }

  /**
   * 获取房间号,只针对咪咕棋牌游戏有效
   * atob
   */
  getRoomId() {
    HttpRequest.getRoomId({}, (res) => {
      console.log(res);
      console.log('哈哈++++++++++++roomId:  ' + res.resultData.battleCode);
      this.setState({
        roomId: res.resultData.battleCode
      }, () => {
        console.log(this.state.roomId);
        let xml = Transition.JsonToXml({
          root: {
            battle: this.state.roomId,
            user_id: 0
          }
        });
        console.log('加密：' + base64.encode(xml));
        console.log('解密：' + base64.decode(base64.encode(xml)));
        let gameOptions = {
          appid: 123,
          userinfo: {
            uId: '1234',
            utoken: '12345678'
          },
          priority: 0,
          extraId: 'miguh5',
          pkg_name: this.props.location.state.pkg,
          playingtime: 600000,
          configinfo: 'miguh5',
          c_token: 'abcd',
          isPortrait: false,
          payStr: base64.encode(xml)
        };
        console.log('------------');
        console.log(gameOptions.payStr);
        console.log('++++++++++++');
        window.Cloudplay.startSDK(gameOptions);
      });
    }, (err) => {
      this.setState({
        roomId: null
      }, () => {
        let gameOptions = {
          appid: 123,
          userinfo: {
            uId: '1234',
            utoken: '12345678'
          },
          priority: 0,
          extraId: 'miguh5',
          pkg_name: this.props.location.state.pkg,
          playingtime: 600000,
          configinfo: 'miguh5',
          c_token: 'abcd',
          isPortrait: false
        };
        window.Cloudplay.startSDK(gameOptions);
      });
    });
  }
};

