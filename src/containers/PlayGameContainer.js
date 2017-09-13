/**
 * Created by chao on 2017/9/13.
 */
import React, { Component } from 'react';

export default class PlayGameContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      err: false
    };
  }
  render () {
    return (
      <div id='playGameBox' />
    );
  }
  componentDidMount () {
    window.Cloudplay.initSDK({
      accessKeyID: '8F3BB845AD4',
      accesskey:'abe93395b59a25b9c220e19807b8377a',
      channelId: 100000,
      pkg_name: 'com.happyelements.AndroidAnimal',
      onSceneChanged: function (sceneId, extraInfo) {
        console.log('sceneId & extraInfo', sceneId, extraInfo);
      },
      MessageHandler: function (message) {
        console.log(message);
      }
    });
    let gameOptions = {
      appid: 0,
      userinfo: {
        uId: '123',
        utoken: '123456'
      },
      priority: 0,
      extraId: 'miguh5',
      pkg_name: 'com.happyelements.AndroidAnimal',
      playingtime: 600000,
      configinfo: 'miguh5',
      c_token: 'abcd',
      isPortrait: false
    };
    window.Cloudplay.startSDK(gameOptions);
  }
};

