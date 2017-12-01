/**
 * Created by chao on 2017/9/13.
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import HttpRequest from '../utils/HttpRequest';
import Transition from '../utils/Transition';
import Base64 from '../utils/Base64';
import WeChat from '../utils/WeChat';
import ShareTipsModal from '../components/ShareTipsModal';
import wx from 'weixin-js-sdk';
import goBack from '../assets/ddzgoback.png';

import { login, getMyService, getTimeLength, getExtraId } from '../actions/actions';

const Box = styled.div`
  height: ${(props) => props.h / 100}rem;
`;
class PlayGameContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      data: null,
      err: false,
      roomId: null,
      id:null,
      xml: null,
      userName: null,
      userHead: null,
      openId: null,
      show: false,
      pkg:'',
      playTime: null,
      extraId: null
    };
    this.shareTips = this.shareTips.bind(this);
  }

  render () {
    let height = document.getElementsByTagName('html')[0].clientHeight;
    return (
      <div>
        <Box id='playGameBox' h={height} />
        {this.state.show ? <ShareTipsModal onClick={() => {
          this.setState({
            show: false
          });
        }} /> : null}
        {this.GetQueryString('pkg') === 'com.migu.game.cloudddz' ? <div onClick={() => {
          window.Cloudplay.stopGame();
          console.log('清除sdk');
          if (this.state.pkg === 'com.migu.game.cloudddz') {
            this.exitBattle();
          }
          if (this.isWeiXin()) {
            wx.closeWindow();
          } else {
            this.props.history.goBack();
          }
        }} style={{
          position:'fixed',
          top:'0.42rem',
          right:'0.82rem',
          zIndex:'999',
          color:'#000'
        }}><img style={{width: '0.36rem', height: '0.36rem',transform:'rotate(90deg)'}} src={goBack} alt='' /></div> : null
        }
      </div>
    );
  }

  Wxinit () {
    HttpRequest.getWxConfig(
      {
        activityCode:'123',
        url: encodeURIComponent(window.location.href.split('#')[0])
      },
      (res) => {
        WeChat.init({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名，见附录1
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'closeWindow'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      },
      (err) => {
      }
    );
  }

  componentWillMount () {
    console.log(window.location.href);
    this.authorize();
  }

  componentDidMount () {
    document.title = '游戏免下载，即点即玩';
    let pkg = this.getPkg();
    console.log('包名', pkg)
    this.init(pkg);
    this.props.history.listen((location, action) => {
      this.Wxinit();
    });
    this.Wxinit();
    WeChat.error();
    // 广东移动验证uToken相关逻辑
    if (this.GetQueryString('channelID') &&
      this.GetQueryString('channelID')==='40129731334'){
      console.log('广东移动验证utoken')

      HttpRequest.validateToken(
        {
          token: encodeURIComponent(this.GetQueryString('uToken'))
        },
        (res) => {
          // 增加自登录和获取时长相关逻辑
          this.autoLogin(res.msisdn)
        },
        (err) => {
          document.title = '出错啦！再试一次吧！！';
        }
      );
    } else {
      console.log('非广东移动业务或者是不存在utoken')
      if (this.isWeiXin() && pkg === 'com.migu.game.cloudddz') {
        WeChat.readyPlayGame();
        this.getWxUserInfo(this.GetQueryString('code'), pkg);
      } else {
        this.start(pkg);
        WeChat.ready();
      }
    }
  }

  autoLogin(phoneNum){
    HttpRequest.loginQuick(
      {
        veritycode: '',
        phone: phoneNum ,
        channelId: '40129731334'
      },
      (res) => {
        this.getTimeLength(res.implicitLoginRsp.userInfo.identityID)
      },
      (err) => {
        console.log('自登录失败了！')
        if (this.isWeiXin() && this.getPkg() === 'com.migu.game.cloudddz') {
          WeChat.readyPlayGame();
          this.getWxUserInfo(this.GetQueryString('code'), this.getPkg());
        } else {
          this.start(this.getPkg());
          WeChat.ready();
        }
      }
    );
  }

  getTimeLength (userId) {
    HttpRequest.getTimeLength(
      {
        user_id: userId,
        service_id: ['gdh5-000000'],
        pkg: this.getPkg(),
        channelId: '40129731334'
      },
      (res) => {
         this.setState({
           playTime: res.result_time,
           extraId: res.trace_unique_id
         },() =>{
           console.log('游戏时长：' + this.state.playTime)
           console.log('extraId：' + this.state.extraId)
           if (this.isWeiXin() && this.getPkg() === 'com.migu.game.cloudddz') {
             WeChat.readyPlayGame();
             this.getWxUserInfo(this.GetQueryString('code'), this.getPkg());
           } else {
             this.start(this.getPkg());
             WeChat.ready();
           }
         })
      },
      (err) => {
        console.log('获取时长失败！')
        if (this.isWeiXin() && this.getPkg() === 'com.migu.game.cloudddz') {
          WeChat.readyPlayGame();
          this.getWxUserInfo(this.GetQueryString('code'), this.getPkg());
        } else {
          this.start(this.getPkg());
          WeChat.ready();
        }
      }
    );
  }

  componentWillUnmount () {
    window.Cloudplay.stopGame();
    console.log('清除sdk');
    console.log(this.state.pkg);
    if (window.pkg === 'com.migu.game.cloudddz') {
      this.exitBattle();
    }
  }

  isWeiXin () {
    let ua = window.navigator.userAgent.toLowerCase();
    // eslint-disable-next-line
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }

  getRoomId (pkg,gRoomID,gReason) {
    HttpRequest.getRoomId({}, (res) => {
      console.log('新申请房间,清空所有浏览器缓存数据');
      window.localStorage.setItem('MyRoomId', res.resultData.battleCode);
      window.localStorage.setItem('MyId', res.resultData.id);
      if (this.isWeiXin()){
        this.props.history.replace(
          'playgame?pkg=' + pkg + '&&roomId=' + res.resultData.battleCode + '&&id=' + res.resultData.id + '&&code=' + this.GetQueryString('code')
        );
      } else {
        this.props.history.replace(
          'playgame?pkg=' + pkg + '&&roomId=' + res.resultData.battleCode + '&&id=' + res.resultData.id
        );
      }
      this.Wxinit();
      if (this.isWeiXin() && pkg === 'com.migu.game.cloudddz') {
        console.log('调用斗地主自定义分享');
        WeChat.readyPlayGame();
      } else {
        WeChat.ready();
      }
      this.setState({
        roomId: res.resultData.battleCode,
        id:res.resultData.id
      }, () => {
        let userId;
        userId = window.localStorage.getItem('MyUserId') || Number(Math.random().toString(10).substring(2));
        let xml = Transition.JsonToXml({
          root: {
            battle: res.resultData.battleCode,
            user_id: userId,
            nickName: this.state.userName == null ? '斗地主小王子': this.state.userName,
            headUrl: this.state.userHead == null ? 'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq9dAhibicsKF8pCCiaC3Moiaic97ymCASyDS0m5w7alQSqhnSG1cXwJmAC5LSwsiamvxzJKbuJWM4lswtw/0' : this.state.userHead
          }
        });
        console.log('传递参数：' + xml)
        this.logRecord(xml, '新申请房间逻辑',gRoomID,gReason)
        let gameOptions = {
          appid: 123,
          userinfo: {
            uId: 'user_' + Number(Math.random().toString(10).substring(2)),
            utoken: '12345678'
          },
          priority: 0,
          extraId: (this.state.extraId == null && this.props.extraId === null) ? 'migu-h5' : (this.props.extraId || this.state.extraId),
          pkg_name: this.getPkg(),
          playingtime: (this.state.playTime == null && this.props.timeLength === null) ? 1000000 : (this.props.timeLength || this.state.playTime),
          configinfo: 'miguh5',
          c_token: 'abcd',
          isPortrait: false,
          payStr: Base64.encode(xml)
        };
        window.localStorage.setItem('MyUserId', userId);
        console.log('传递参数Base64编码：' + gameOptions.payStr)
        window.Cloudplay.startGame(gameOptions);
        console.log(gameOptions);
      });
    }, (err) => {
        document.title = '斗地主出错啦！再试一次吧！！';
    });
  };

  getPkg () {
    let pkg;
    if (this.props.location.state) {
      pkg = this.props.location.state.pkg;
    } else {
      pkg = this.GetQueryString('pkg');
    }
    window.pkg = pkg;
    return pkg;
  }

  logRecord(gxml, gtype,groomID,greason){
    HttpRequest.userBehaviorLogReport({
        actionId: 'test001',
        xml: gxml,
        urlRoomID: this.GetQueryString('roomId'),
        urlID: this.GetQueryString('id'),
        localRoomID: window.localStorage.getItem('MyRoomId'),
        localID: window.localStorage.getItem('MyId'),
        localUserID: window.localStorage.getItem('MyUserId'),
        active: '棋牌透传参数信息',
        type: gtype,
        tRoomID: groomID,
        tReason: greason
      },
      (response) => {
        console.log('棋牌透传参数信息上报成功')
      },
      (error) => {
        // console.log('没有预约')
      }
    )
  }

  init (pkg) {
    window.Cloudplay.initSDK({
      accessKeyID: 'D4F92FE4CFC',
      channelId: this.GetQueryString('channelID') == null ? 'migu-h5' : this.GetQueryString('channelID'),
      dontLoadJQuery: false,
      onSceneChanged: (sceneId, extraInfo) => {
        console.log(sceneId)
        if (sceneId === 'play') {
          console.log('开始云玩')
          this.shareTips();
        }
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
        if (window.localStorage.getItem('MyRoomId') &&
          'null' !== window.localStorage.getItem('MyRoomId') && window.localStorage.getItem('MyId')
          && 'null' !== window.localStorage.getItem('MyId')) {
          this.setState({
            roomId: window.localStorage.getItem('MyRoomId'),
            id:window.localStorage.getItem('MyId')
          }, () => {
            this.checkRoomId(window.localStorage.getItem('MyId'), pkg, 'URL中的RoomID为null但是缓存MyRoomId和MyId不为null');
          });
        } else {
          console.log('浏览器中不存在缓存信息');
          this.getRoomId(pkg,'URL中的RoomID为null并且缓存MyRoomId或MyId也为null','');
        }
      } else {
        if ('null' !== this.GetQueryString('roomId') &&
          'null' !== this.GetQueryString('id')) {
          this.setState({
            roomId: this.GetQueryString('roomId'),
            id:this.GetQueryString('id')
          }, () => {
            // eslint-disable-next-line
            console.log('读取地址中的房间信息和id信息 ' + 'roomId: ' + this.state.roomId +
              ', id: ' + this.GetQueryString('id'));
            this.checkRoomId(this.GetQueryString('id'), pkg, 'URL中的RoomID和ID都不为null');
          });
        } else {
          console.log('地址中不含有roomid或者id，或者是roomid或id为null')
          this.getRoomId(pkg,'URL中的RoomID或ID为null','');
        }
      }
    } else {
      // 广东移动透传utoken参数
      if (this.GetQueryString('uToken') !== null) {
        // 增加渠道统计
        if (this.GetQueryString('channelID') != null){
          this.props.history.replace(
            'playgame?pkg=' + pkg + '&&channelID=' + this.GetQueryString('channelID') + '&&uToken=' + this.GetQueryString('uToken')
          );
        } else {
          this.props.history.replace(
            'playgame?pkg=' + pkg + '&&uToken=' + this.GetQueryString('uToken')
          );
        }
      } else {
        // 增加渠道统计
        if (this.GetQueryString('channelID') != null){
          this.props.history.replace(
            'playgame?pkg=' + pkg + '&&channelID=' + this.GetQueryString('channelID')
          );
        } else {
          this.props.history.replace(
            'playgame?pkg=' + pkg
          );
        }
      }

      let gameOptions = {
        appid: 123,
        userinfo: {
          uId: 'user_' + Number(Math.random().toString(10).substring(2)),
          utoken: '12345678'
        },
        priority: 0,
        extraId: (this.state.extraId == null && this.props.extraId === null) ? 'migu-h5' : (this.props.extraId || this.state.extraId),
        pkg_name: this.getPkg(),
        playingtime: (this.state.playTime == null && this.props.timeLength === null) ? 1000000 : (this.props.timeLength || this.state.playTime),
        configinfo: 'miguh5',
        c_token: 'abcd',
        isPortrait: false
      };
      window.Cloudplay.startGame(gameOptions);
      console.log(gameOptions)
    }
  };

  GetQueryString (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let reg2 = new RegExp('(^|-)' + name + '=([^-]*)(-|$)');
    let r;
    if (window.location.search.substr(1).indexOf('-') === -1) {
      r = window.location.search.substr(1).match(reg);
    } else {
      r = window.location.search.substr(1).match(reg2);
    }
    if (r === null) {
      r = window.location.search.substr(1).match(reg);
    }
    if (r != null) {
      console.log('获得参数');
      console.log(r[2]);
      return unescape(r[2]);
    }
    return null;
  }

  checkRoomId(id, pkg,gRoomID) {
    HttpRequest.checkRoomId({battleId: id}, (res) => {
        if (res.returnCode !== '001') {
          console.log('不可加入约战组!')
          window.localStorage.setItem('MyRoomId', null);
          window.localStorage.setItem('MyId', null);
          // window.localStorage.setItem('MyUserId', null);
          this.getRoomId(this.getPkg(), gRoomID, '不可加入约战组');
        } else {
          console.log('约战组正常可以加入')
          let userId;
          userId = (window.localStorage.getItem('MyUserId') === null || window.localStorage.getItem('MyUserId') === 'null') ?
            Number(Math.random().toString(10).substring(2)) : window.localStorage.getItem('MyUserId');
          let xml = Transition.JsonToXml({
            root: {
              battle: this.state.roomId,
              user_id: userId,
              nickName: this.state.userName == null ? '斗地主小王子' : this.state.userName,
              headUrl: this.state.userHead == null ? 'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq9dAhibicsKF8pCCiaC3Moiaic97ymCASyDS0m5w7alQSqhnSG1cXwJmAC5LSwsiamvxzJKbuJWM4lswtw/0' : this.state.userHead
            }
          });
          console.log('传递参数：' + xml)
          this.logRecord(xml,'约战组可以正常加入逻辑',gRoomID,'约战组可以加入')
          let gameOptions = {
            appid: 123,
            userinfo: {
              uId: 'user_' + Number(Math.random().toString(10).substring(2)),
              utoken: '12345678'
            },
            priority: 0,
            extraId: (this.state.extraId == null && this.props.extraId === null) ? 'migu-h5' : (this.props.extraId || this.state.extraId),
            pkg_name: this.getPkg(),
            playingtime: (this.state.playTime == null && this.props.timeLength === null) ? 1000000 : (this.props.timeLength || this.state.playTime),
            configinfo: 'miguh5',
            c_token: 'abcd',
            isPortrait: false,
            payStr: Base64.encode(xml)
          };
          window.localStorage.setItem('MyUserId', userId);
          console.log('传递参数Base64编码：' + gameOptions.payStr)
          window.Cloudplay.startGame(gameOptions);
          console.log(gameOptions)
          if (this.isWeiXin()) {
            this.props.history.replace(
              'playgame?pkg=' + pkg + '&&roomId=' + this.state.roomId + '&&id=' + id + '&&code=' + this.GetQueryString('code')
            );
          } else {
            this.props.history.replace(
              'playgame?pkg=' + pkg + '&&roomId=' + this.state.roomId + '&&id=' + id
            );
          }
          this.Wxinit();
          if (this.isWeiXin() && pkg === 'com.migu.game.cloudddz') {
            console.log('调用斗地主自定义分享');
            WeChat.readyPlayGame();
          } else {
            WeChat.ready();
          }
        }
      }, (err) => {
          document.title = '斗地主出错啦！再试一次吧！！';
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
          console.log('获取code');
          console.log('http://migugame.cmgame.com/gulu/' +
            'wechat/capacity/getWxCodeInfo?redirectUrl=' + url);
          window.location.href = 'http://migugame.cmgame.com/gulu/' +
            'wechat/capacity/getWxCodeInfo?redirectUrl=' + url;
        }
      }
    }
  }

  getWxUserInfo (code, pkg) {
    HttpRequest.getWxUserInfo(
      { code: code },
      (res) => {
        window.localStorage.setItem('WxChatName', res.nickname);
        this.setState({
          userName: res.nickname,
          userHead: res.headimgurl,
          openId: res.openid
        }, () => {
          this.start(pkg);
        });
      },
      (err) => {
      }
    );
  }

  exitBattle () {
    console.log('退出越战')
    HttpRequest.exitBattleGroup(
      {
        appId:1,
        battleId:this.state.id,
        roomId:this.state.roomId
      },
      (res) => {
        console.log('退出约战');
        console.log(res);
      },
      (err) => {
      }
    );
  }

  shareTips () {
    let pkg = this.getPkg();
    if (this.isWeiXin() && pkg === 'com.migu.game.cloudddz') {
      this.setState({
        show: true
      });
    }
  }
};

const getLogin = state => {
  return {
    isLogin: state.update.login,
    timeLength: state.update.timeLength,
    extraId: state.update.extraId
  };
};

export default connect(getLogin, { login, getMyService, getTimeLength, getExtraId })(PlayGameContainer);