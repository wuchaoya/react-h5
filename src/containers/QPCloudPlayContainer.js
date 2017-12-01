/**
 * 咪咕棋牌游戏云游戏界面
 * @author shisheng.zhao
 * @date 2017-11-23
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import HttpRequest from '../utils/HttpRequest';
import Transition from '../utils/Transition';
import Base64 from '../utils/Base64';
import WeChat from '../utils/WeChat';
import wx from 'weixin-js-sdk';
import goBack from '../assets/ddzgoback.png';
// 微信默认显示title
let wxTitle = '游戏免下载，即点即玩';
// accessKeyID
let hmAccessKeyID = 'D4F92FE4CFC';
// 斗地主packageName
let ddzPackageName = 'com.migu.game.cloudddz';
// 默认微信昵称和头像
let wxNickName = '斗地主';
let wxHeadUrl = 'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq9dAhibicsKF8pCCiaC3Moiaic97ymCASyDS0m5w7alQSqhnSG1cXwJmAC5LSwsiamvxzJKbuJWM4lswtw/0';

const Box = styled.div`
  height: ${(props) => props.h / 100}rem;
`;
export default class QPCloudPlayContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      data: null,
      err: false,
      id:null,
      xml: null, // 棋牌游戏启动参数
      packageName: null, // 游戏包名
      wxUserName: null, // 微信昵称
      wxUserHead: null, // 微信头像URL
      wxOpenId: null, // 微信授权openid
      userId: null, // 用户ID
      phoneNum: null, // openid绑定手机号
      roomId: null, // 约战房间号
      battleId: null, // 约战组ID
      show: false,
      pkg:'',
      channelID: 'migu-h5'
    };
    // this.shareTips = this.shareTips.bind(this); ?
  }

  render () {
    let height = document.getElementsByTagName('html')[0].clientHeight;
    return (
      <div>
        <Box id='playGameBox' h={height} />
        {this.state.packageName === ddzPackageName ? <div onClick={() => {
          // 释放Saas SDK释放实例
          window.Cloudplay.stopGame();
          // 退出约战房间
          this.exitBattle();
          if (this.isWeiXin()) {
            wx.closeWindow(); // 关闭浏览器
          } else {
            this.props.history.goBack();
          }
        }} style={{
          position:'fixed',
          top:'0.42rem',
          right:'0.82rem',
          zIndex:'999',
          color:'#000'
        }}>
          <img
            style={{ width: '0.36rem', height: '0.36rem', transform:'rotate(90deg)' }}
            src={goBack} alt='' />
        </div> : null
        }
      </div>
    );
  }

  componentWillMount () {
    this.authorize();
  }

  componentDidMount () {
    document.title = wxTitle;
    this.initData(); // 初始化packageName和channel等信息
    this.initSaasSDK();
    this.Wxinit(); // 初始化微信JS SDK
    WeChat.error();
  }

  /**
   * 初始化数据,包括packageName, channelId
   */
  initData () {
    let pkg;
    let cId;
    if (this.props.location.state) {
      pkg = this.props.location.state.pkg;
      cId = this.props.location.state.channelId;
    } else {
      pkg = this.GetQueryString('pkg');
      cId = this.GetQueryString('channelId');
    }
    console.log(pkg);
    this.setState({
      packageName: pkg,
      channelId: cId
    }, () => {
      if (this.state.packageName === ddzPackageName) {
        WeChat.readyPlayGame();
        this.getWxUserInfo();
      } else {
        WeChat.ready();
        this.startCloudPlay();
      }
    });
  }

  /**
   * 获取包名
   * @returns {*}
   */
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

  /**
   * 初始化Saas SDK信息
   */
  initSaasSDK () {
    console.log(window);
    window.Cloudplay.initSDK({
      accessKeyID: hmAccessKeyID,
      channelId: this.state.channelID,
      dontLoadJQuery: false,
      onSceneChanged: (sceneId, extraInfo) => {
        if (sceneId === 'play') {
          // this.shareGuideTips();
        }
      },
      MessageHandler: function (message) {
        console.log(message);
      }
    });
  };

  /**
   * 初始化微信config
   * @constructor
   */
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

  /**
   * 分享引导涂层展示
   */
  shareGuideTips () {
    if (this.isWeiXin() && this.state.packageName === ddzPackageName) {
      this.setState({
        show: true
      });
    }
  }

  /**
   * 判断当前是否是在微信内置浏览器中
   * @returns {boolean}
   */
  isWeiXin () {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 获取浏览器中的参数信息
   * @param name
   * @returns {*}
   * @constructor
   */
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

  /**
   * 获取微信授权登录相关信息
   */
  getWxUserInfo () {
    HttpRequest.getWxUserInfo(
      {
        code: this.GetQueryString('code')
      },
      (res) => {
        this.setState({
          wxUserName: res.nickname,
          wxUserHead: res.headimgurl,
          wxOpenId: res.openid
        }, () => {
          // 通过openID获取userId的接口获取userId,如果已创建的用户同步返回手机号,新用户手机号返回null
          this.getUserIdByOpenId();
        });
      },
      (err) => {
      }
    );
  }

  /**
   * 微信授权登录
   */
  authorize () {
    if (this.isWeiXin() && this.state.packageName === ddzPackageName) {
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

  /**
   * 通过openid获取userId
   */
  getUserIdByOpenId () {
    HttpRequest.getUserIdByOpenId(
      {
        openId: this.state.wxOpenId // 微信授权登录openid
      }, (res) => {
        // 返回userid和phoneNum(如果有的话返回,如果没有返回null)
      this.setState({
        userId: res.userId,
        phoneNum: res.phoneNum
      }, () => {
          // 查询当前userId所在约战组信息
        this.checkUserBattleId();
      });
       }, (err) => {
        document.title = '系统异常,请重试!';
      }
    );
  }

  /**
   * 查询用户当前所在约战组
   */
  checkUserBattleId() {
    HttpRequest.checkUserBattleId(
      {
        hardwareCode: this.state.userId // 用户userid
      }, (res) =>{
        if (res.resultData){ // 当前用户当前正在其他约战组中
          this.setState({
            roomId: res.resultData.roomId,
            battleId: res.resultData.battleId
          }, () => {
            this.checkBattleId(this.state.roomId, this.state.battleId); // 检查当前用户所在约战组是否可用
          });
        } else { // 当前用户当前不在其他约战组中
          if(this.GetQueryString('roomId') && this.GetQueryString('battleId')){
            // 如果URL中含有roomId和battleId并且都不为空
            this.checkBattleId(this.GetQueryString('roomId'), this.GetQueryString('battleId'));
          } else {
            // 查询当前用户剩余房卡
            this.checkUserRoomCard();
          }
        }
      }, (err) => {
        document.title = '斗地主出错啦！再试一次吧！！';
      }
    );
  }

  /**
   * 检查当前约战组是否可用
   * @param bid: 约战组ID
   */
  checkBattleId(mRoomId, mBattleId) {
    HttpRequest.checkRoomId(
      {
        battleId: mBattleId, // 约战组ID
        hardwareCode: this.state.userId // 用户userid
      }, (res) => {
        if (res.returnCode !== '001') {
          // 查询当前用户剩余房卡
          this.checkUserRoomCard();
        } else {
          console.log('约战组可以正常加入,加入约战组')
          this.addBattleRoom();
          this.replaceUrl();
        }
      }, (err) => {
        document.title = '斗地主出错啦！再试一次吧！！';
      }
    );
  }

  /**
   * 创建约战房间
   */
  createRoomId () {
    HttpRequest.getRoomId({}, (res) => {
      console.log('新申请房间');
      this.setState({
        roomId: res.resultData.battleCode,
        battleId: res.resultData.id
      }, () => {
        this.addBattleRoom();
        this.replaceUrl();
      });
    }, (err) => {
      document.title = '斗地主出错啦！再试一次吧！！';
    });
  };

  /**
   * 加入约战房间
   */
  addBattleRoom () {
    let xml = Transition.JsonToXml({
      root: {
        battle: this.state.roomId,
        user_id: this.state.userId == null ? Number(Math.random().toString(10).substring(2)) : this.state.userId,
        nickName: this.state.userName == null ? wxNickName : this.state.userName,
        headUrl: this.state.userHead == null ? wxHeadUrl : this.state.userHead
      }
    });
    console.log('传递参数：' + xml)
    let gameOptions = {
      appid: 123,
      userinfo: {
        uId: 'user_' + Number(Math.random().toString(10).substring(2)),
        utoken: '12345678'
      },
      priority: 0,
      pkg_name: this.state.packageName,
      configinfo: 'miguh5',
      c_token: 'abcd',
      isPortrait: false,
      payStr: Base64.encode(xml)
    };
    console.log('传递参数Base64编码：' + gameOptions.payStr)
    window.Cloudplay.startGame(gameOptions);
  }

  /**
   * 启动云游戏
   */
  startCloudPlay () {
    let gameOptions = {
      appid: 123,
      userinfo: {
        uId: 'user_' + Number(Math.random().toString(10).substring(2)),
        utoken: '12345678'
      },
      priority: 0,
      pkg_name: this.getPkg(),
      configinfo: 'miguh5',
      c_token: 'abcd',
      isPortrait: false
    };
    window.Cloudplay.startGame(gameOptions);
  }

  /**
   * 查询用户剩余房卡
   */
  checkUserRoomCard () {
    HttpRequest.checkUserRoomCard(
      {
        userId: this.state.userId // 用户userid
      }, (res) => {
        if (true){ // 当前用户剩余房卡数量大于等于1, 创建新的房间
          this.createRoomId();
        } else { // 当前用户不剩余房卡, 引导用户开通包月订购房卡
          this.showOpenMonthlyDialog();
        }
      }, (err) => {
        document.title = '系统异常,请重试!';
      }
    );
  }

  /**
   * 地址发生变更时刷新URL地址信息,刷新地址之后同步刷新微信自定义分享地址信息
   */
  replaceUrl () {
    let pkg = this.getPkg();
    let id = this.state.id;
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
    if (this.isWeiXin() && pkg === ddzPackageName) {
      WeChat.readyPlayGame();
    } else {
      WeChat.ready();
    }
  }

  /**
   * 引导用户开通包月订购弹窗
   */
  showOpenMonthlyDialog () {
    if (true) {
      this.openMonthly();
    } else {
    }
  }

  /**
   * 开通包月订购
   */
  openMonthly () {
    HttpRequest.openMonthly(
      {
        userId: this.state.userId, // 用户userid
        serverId: ''
      }, (res) => {
        // 成功订购包月;1.购买房卡到当前userid;2.如果手机号为null,则建立手机号和openid的绑定关系;3.隐式登录
        this.autoLogin();
        this.showConsumptionRoomCard();
      }, (err) => {
        document.title = '系统异常,请重试!';
      }
    );
  }

  /**
   * 隐式登录
   */
  autoLogin () {
    HttpRequest.loginQuick(
      {
        veritycode: '',
        phone: this.state.phoneNum,
        channelId: '40129731334'
      },
      (res) => {
      },
      (err) => {
      }
    );
  }

  /**
   * 提示用户创建房间消费房卡Dialog
   */
  showConsumptionRoomCard () {
    if (true) {
      this.consumptionRoomCard();
    } else {
    }
  }

  /**
   * 消费房卡
   */
  consumptionRoomCard () {
    HttpRequest.consumptionRoomCard(
      {
        userId: this.state.userId
      },
      (res) => {
        // 创建房间
        this.createRoomId();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  componentWillUnmount () {
    window.Cloudplay.stopGame();
    console.log('调用SDK stopGame()方法释放实例');
    if (this.state.packageName === ddzPackageName) {
      this.exitBattle();
    }
  }

  /**
   * 退出约战组
   */
  exitBattle () {
    console.log('退出约战组');
    HttpRequest.exitBattleGroup(
      {
        appId: 1,
        battleId: this.state.battleId,
        roomId: this.state.roomId,
        hardwareCode: this.state.userId // 用户ID
      },
      (res) => {
        console.log(res);
      },
      (err) => {
      }
    );
  }

  /**
   * 日志上报内送
   * @param gxml
   */
  logRecord (gxml) {
    HttpRequest.userBehaviorLogReport(
      {
        actionId: 'test001',
        xml: gxml,
        urlRoomID: this.GetQueryString('roomId'),
        urlID: this.GetQueryString('id'),
        localRoomID: window.localStorage.getItem('MyRoomId'),
        localID: window.localStorage.getItem('MyId'),
        localUserID: window.localStorage.getItem('MyUserId'),
        active: '棋牌透传参数信息'
      },
      (response) => {
        console.log('棋牌透传参数信息上报成功');
      },
      (error) => {
        // console.log('没有预约')
      }
    );
  }
};
