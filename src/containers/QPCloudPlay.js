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
import goBack from '../assets/img/ddzgoback.png';
import InputPhoneModal from '../components/InputPhoneModal';
import CreateRoomIdModal from '../components/CreateRoomIdModal';
import OpenMonthlyDialog from '../components/OpenMonthlyDialog';
import ShareTipsModal from '../components/ShareTipsModal';
import ExitTipsModal from '../components/ExitTipsModal';
import ExitRoomIdModal from '../components/ExitRoomIdModal';

// 微信默认显示title
let wxTitle = '游戏免下载，即点即玩';
// accessKeyID
let hmAccessKeyID = 'D4F92FE4CFC';
// 斗地主packageName
let ddzPackageName = 'com.migu.game.cloudddz';
let channelID = '1deb33365f16b5673cdcc65a11fd3057';
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
			userId: null, // 咪咕ID
			uid: null, // 用户UID
			phoneNum: null, // openid绑定手机号
			roomCard: null, // 剩余房卡数量
			extraId: null, // extraId
			roomId: null, // 约战房间号
			battleId: null, // 约战组ID
			show: false,
			showTips: null,
			channelID: 'migu-h5',
			ExitRoomIdModalShow: false,
			ExitTipsModalShow: false,
			CreateRoomIdModalShow: false,
			InputPhoneModalShow: false,
			OpenMonthlyModalShow: false,
			ShareTipsModalShow: false,
			services: []
		};
		// this.shareTips = this.shareTips.bind(this); ?
		this.onMessage = this.onMessage.bind(this);
	}
	
	render () {
		let height = document.getElementsByTagName('html')[0].clientHeight;
		return (
      <div>
        <Box id='playGameBox' h={height} />
				{this.state.packageName === ddzPackageName ? <div onClick={() => {
					// 退出约战房间
					this.setState({
						ExitRoomIdModalShow : true
					});
				}} style={{
					position:'fixed',
					top:'0.42rem',
					right:'0.82rem',
					zIndex:'1',
					color:'#000'
				}}>
          <img
            style={{ width: '0.60rem', height: '0.60rem', transform:'rotate(90deg)' }}
            src={goBack} alt='' />
        </div> : null
				}
				{this.state.InputPhoneModalShow ? <InputPhoneModal
          ref='phone'
          title='绑定手机号'
          onChange={() => {
						this.setState({
							phoneNum: this.refs.phone.refs.input.value
						});
					}}
          onConfirm={() => this.showBindPhoneDialog()}
        /> : null}
				{this.state.ExitTipsModalShow ? <ExitTipsModal
          title={ this.state.showTips }
          onCancel={() => this.isCloseDialog(false)}
        /> : null}
				{this.state.ExitRoomIdModalShow ? <ExitRoomIdModal
          title='是否确认退出房间？'
          onCancel={() => this.isCloseDialog(false)}
          onConfirm={() => this.exitBattle()}
        /> : null}
				{this.state.CreateRoomIdModalShow ? <CreateRoomIdModal
          title='创建房间需消耗一张房卡'
          onCancel={() => this.showConsumptionRoomCard(false)}
          onConfirm={() => this.showConsumptionRoomCard(true)}
        /> : null}
				{this.state.OpenMonthlyModalShow ? <OpenMonthlyDialog
          services={this.state.services}
          phone={this.state.phoneNum}
          uid={this.state.userId} /> : null }
				{this.state.ShareTipsModalShow ? <ShareTipsModal onClick={() => {
					this.setState({
						ShareTipsModalShow: false
					});
				}} /> : null}
      </div>
		);
	}
	
	componentWillMount () {
		// this.authorize();
	}
	
	componentDidMount () {
		document.title = wxTitle;
		this.initData(); // 初始化packageName和channel等信息
		this.Wxinit(); // 初始化微信JS SDK
		WeChat.error();
		// 开通包月后获得通知再次获取房卡
		window.addEventListener('message', this.onMessage);
	}
	onMessage (event) {
		if (event.origin === 'http://pcloud.haimawan.com' || event.origin === 'http://api_dev.haimawan.com' || event.origin === 'http://migu-api.cmgame.com') {
			this.getMyService(this.state.userId ? this.state.userId : this.state.uid);
			this.setState({
				OpenMonthlyModalShow: false
			});
		}
	}
	/**
	 * 初始化数据,包括packageName, channelId
	 */
	initData () {
		let pkg;
		let cId;
		// console.log('wxName:' + this.props.location.state.wxName + ';wxIcon:' + this.props.location.state.wxIcon +
		// ';openId:' + this.props.location.state.openId + ';userId:' + this.props.location.state.userId + ';uid:' +
		//   this.props.location.state.uid + '' + ';phone:' + this.props.location.state.phone + ';roomCard:' +
		//   this.props.location.state.roomCard + ';extraId:' + this.props.location.state.extraId + ';pkg:' +
		//   this.props.location.state.pkg);
		if (window.localStorage.getItem('qpdata')) {
			this.props.location.state = JSON.parse(window.localStorage.getItem('qpdata'));
		}
		if (this.props.location.state) {
			pkg = this.props.location.state.pkg;
			cId = this.props.location.state.channelId;
			this.setState({
				wxUserName: this.props.location.state.name,
				wxUserHead: this.props.location.state.userImg,
				wxOpenId: this.props.location.state.openId,
				userId: this.props.location.state.userId,
				uid: this.props.location.state.uid,
				phoneNum: this.props.location.state.phone,
				roomCard: this.props.location.state.roomCard,
				extraId: this.props.location.state.extraId,
				packageName: pkg,
				channelId: cId
			}, ()=> {
				this.initSaasSDK();
				if (this.isWeiXin()) {
					console.log('微信浏览器');
					WeChat.readyPlayGame();
					this.getWxUserInfo();
				} else {
					console.log('非微信浏览器');
					WeChat.ready();
					this.startCloudPlay();
				}
			});
		} else {
			pkg = this.GetQueryString('pkg');
			cId = this.GetQueryString('channelId');
			this.setState({
				packageName: pkg,
				channelId: cId
			}, () => {
				this.initSaasSDK();
				if (this.isWeiXin()) {
					console.log('微信浏览器');
					WeChat.readyPlayGame();
					this.getWxUserInfo();
				} else {
					console.log('非微信浏览器');
					WeChat.ready();
					this.startCloudPlay();
				}
			});
		}
	}
	
	/**
	 * 初始化Saas SDK信息
	 */
	initSaasSDK () {
		window.Cloudplay.initSDK({
			accessKeyID: hmAccessKeyID,
			channelId: this.state.channelID,
			dontLoadJQuery: false,
			onSceneChanged: (sceneId, extraInfo) => {
				if (sceneId === 'play') {
					this.shareGuideTips();
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
				url: encodeURIComponent(window.location.href.split('#')[0]),
				channel_id: channelID
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
				ShareTipsModalShow: true
			});
		}
	}
	
	/**
	 * 判断当前是否是在微信内置浏览器中
	 * @returns {boolean}
	 */
	isWeiXin () {
		let ua = window.navigator.userAgent.toLowerCase();
		// eslint-disable-next-line
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
		if (this.state.uid && this.state.wxOpenId) {
			console.log('微信已授权,并且uid和openid都不为null');
			this.checkUserBattleId();
		} else {
			console.log('微信未授权');
			console.log('获取微信用户信息');
			HttpRequest.getWxUserInfo(
				{
					code: this.GetQueryString('code'),
					channel_id: channelID
				},
				(res) => {
					console.log(res);
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
					document.title = '微信授权登录失败';
				}
			);
		}
	}
	
	/**
	 * 微信授权登录
	 */
	authorize () {
		if (this.isWeiXin() && this.state.packageName === ddzPackageName) {
			if (!this.GetQueryString('code')) {
				let url = window.location.href;
				if (this.state.packageName) {
					url = url + '?pkg=' + this.state.packageName;
				}
				window.location.href = 'http://migugame.cmgame.com/gulu/' +
					'wechat/capacity/getWxCodeInfo?redirectUrl=' + url;
			}
		}
	}
	
	/**
	 * 通过openid获取userId
	 */
	getUserIdByOpenId () {
		HttpRequest.bindOpenId(
			{
				channel_id: channelID,
				openid: this.state.wxOpenId // 微信授权登录openid
			}, (res) => {
				// 返回userid和phoneNum(如果有的话返回,如果没有返回null)
				console.log(res);
				this.setState({
					uid: res.uid,
					userId: res.user_id,
					phoneNum: res.mobile
				}, () => {
					
					// 查询当前userId所在约战组信息
					this.checkUserBattleId();
				});
			}, (err) => {
				document.title = '通过openid获取userId失败';
			}
		);
	}
	
	/**
	 * 查询用户当前所在约战组
	 */
	checkUserBattleId () {
		console.log('查询用户当前所在约战组,uid:' + this.state.uid);
		HttpRequest.checkUserBattleId(
			{
				hardwareCode: this.state.uid,
				channel_id: channelID
				
			}, (res) => {
				console.log(res);
				if (res.returnCode === '000000' && res.resultData.roomId && res.resultData.battleId) { // 当前用户当前正在其他约战组中
					this.setState({
						roomId: res.resultData.roomId,
						battleId: res.resultData.battleId
					}, () => {
						this.addBattleRoom();
						this.replaceUrl();
					});
				} else { // 当前用户当前不在其他约战组中
					console.log('当前用户当前不在其他约战组中');
					if (this.GetQueryString('roomId') && this.GetQueryString('battleId')){
						// 如果URL中含有roomId和battleId并且都不为空
						this.setState({
							roomId: this.GetQueryString('roomId'),
							battleId: this.GetQueryString('battleId')
						}, ()=>{
							this.checkBattleId(this.state.roomId, this.state.battleId);
						});
					} else {
						// 查询当前用户剩余房卡
						console.log('查询当前用户剩余房卡');
						this.getMyService(this.state.userId ? this.state.userId : this.state.uid);
					}
				}
			}, (err) => {
				document.title = '查询用户当前所在约战组失败';
			}
		);
	}
	
	/**
	 * 检查当前约战组是否可用
	 * @param bid: 约战组ID
	 */
	checkBattleId(mRoomId, mBattleId) {
		console.log('检查当前约战组是否可用,uid:' + this.state.uid + ';battleId:' + mBattleId);
		HttpRequest.checkRoomId(
			{
				battleId: mBattleId, // 约战组ID
				hardwareCode: this.state.uid, // 用户userid
				channel_id: channelID
			}, (res) => {
				if (res.returnCode !== '001') {
					// 查询当前用户剩余房卡
					this.getMyService(this.state.userId ? this.state.userId : this.state.uid);
				} else {
					console.log('约战组可以正常加入,加入约战组')
					this.addBattleRoom();
					this.replaceUrl();
				}
			}, (err) => {
				document.title = '检查当前约战组是否可用失败';
			}
		);
	}
	
	/**
	 * 创建约战房间
	 */
	createRoomId () {
		console.log('创建新房间,extraId:' + this.state.extraId + ';pkg:' + this.state.packageName);
		HttpRequest.getRoomId({
			extraId: this.state.extraId,
			pkgName: this.state.packageName,
			channel_id: channelID
		}, (res) => {
			this.setState({
				roomId: res.resultData.battleCode,
				battleId: res.resultData.id
			}, () => {
				this.addBattleRoom();
				this.replaceUrl();
			});
		}, (err) => {
			document.title = '创建约战组失败';
		});
	};
	
	/**
	 * 加入约战房间
	 */
	addBattleRoom () {
		let xml = Transition.JsonToXml({
			root: {
				battle: this.state.roomId,
				user_id: this.state.uid == null ? Number(Math.random().toString(10).substring(2)) : this.state.uid,
				nickName: this.state.wxUserName == null ? wxNickName : this.state.wxUserName,
				headUrl: this.state.wxUserHead == null ? wxHeadUrl : this.state.wxUserHead
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
			extraId: this.state.extraId,
			isPortrait: false,
			payStr: Base64.encode(xml)
		};
		window.localStorage.setItem('WxChatName', this.state.wxUserName);
		window.localStorage.setItem('MyRoomId', this.state.roomId);
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
			pkg_name: this.state.packageName,
			configinfo: 'miguh5',
			c_token: 'abcd',
			isPortrait: false
		};
		window.Cloudplay.startGame(gameOptions);
	}
	
	/**
	 * 查询用户剩余房卡
	 */
	checkUserRoomCard (serviceId) {
		console.log('查询当前用户剩余房卡,uid:' + this.state.uid);
		HttpRequest.selectRoomCard(
			{
				user_id: this.state.userId ? this.state.userId : this.state.uid, // 用户userid
				service_id: serviceId,
				channel_id: channelID //  注释掉查询不到房卡显示包月
			},
			(res) => {
				console.log(res);
				let data = {
					name: this.state.wxUserName,
					userImg: this.state.wxUserHead,
					openId: this.state.wxOpenId,
					userId: this.state.userId,
					uid: this.state.uid,
					phone: this.state.phoneNum,
					roomCard: this.state.roomCard,
					extraId: this.state.extraId,
					pkg: ddzPackageName
				};
				window.localStorage.setItem('qpdata', JSON.stringify(data));
				if (res.result_room_card > 0) { // 当前用户剩余房卡数量大于等于1, 创建新的房间
					this.setState({
						roomCard: res.result_room_card,
						extraId: res.trace_unique_id,
						CreateRoomIdModalShow : true
					}, () => {
					});
				} else { // 当前用户不剩余房卡, 引导用户开通包月订购房卡
					this.showOpenMonthlyDialog();
				}
			},
			(err) => {
				document.title = '查询当前用户剩余房卡失败';
			}
		);
	}
	
	/**
	 * 地址发生变更时刷新URL地址信息,刷新地址之后同步刷新微信自定义分享地址信息
	 */
	replaceUrl () {
		if (this.isWeiXin()) {
			this.props.history.replace(
				'qpc?pkg=' + this.state.packageName + '&&roomId=' + this.state.roomId + '&&battleId=' + this.state.battleId + '&&code=' + this.GetQueryString('code')
			);
		} else {
			this.props.history.replace(
				'qpc?pkg=' + this.state.packageName + '&&roomId=' + this.state.roomId + '&&battleId=' + this.state.battleId
			);
		}
		this.Wxinit();
		if (this.isWeiXin() && this.state.packageName === ddzPackageName) {
			WeChat.readyPlayGame();
		} else {
			WeChat.ready();
		}
	}
	
	/**
	 * 引导用户开通包月订购弹窗
	 */
	showOpenMonthlyDialog () {
		if (this.state.userId && this.state.phoneNum) { // 已绑定咪咕账户和手机号
			this.setState({
				OpenMonthlyModalShow : true
			});
			// // todo shisheng.zhao 开通包月订购成功之后
			// this.checkUserRoomCard();
		} else {
			// 未绑定咪咕账户,引导用户绑定手机号
			this.setState({
				InputPhoneModalShow : true
			});
		}
	}
	
	/**
	 * 引导用户绑定手机号界面
	 */
	showBindPhoneDialog () {
		this.setState({
			InputPhoneModalShow : false
		}, ()=>{
			this.bindPhone();
		});
	}
	
	/**
	 * 绑定手机号
	 */
	bindPhone () {
		HttpRequest.bindPhone(
			{
				openid: this.state.wxOpenId,
				mobile: this.state.phoneNum
			},
			(res) => {
				this.autoLogin();
			},
			(err) => {
				document.title = '绑定手机号失败';
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
				channel_id: channelID
			},
			(res) => {
				// 登录成功之后获取
				console.log(res);
				this.setState({
					userId: res.implicitLoginRsp.userInfo.identityID
				}, () => {
					this.showOpenMonthlyDialog();
				});
			},
			(err) => {
				document.title = '用户登陆失败！';
			}
		);
	}
	
	/**
	 * 提示用户创建房间消费房卡Dialog
	 */
	showConsumptionRoomCard (bool) {
		if (bool) {
			// 创建房间
			this.createRoomId();
		} else {
			if (this.isWeiXin()) {
				wx.closeWindow();
			} else {
				this.props.history.goBack();
			}
		}
		this.setState({
			CreateRoomIdModalShow : false
		});
	}
	
	componentWillUnmount () {
		window.Cloudplay.stopGame();
		// console.log('调用SDK stopGame()方法释放实例');
		// if (this.state.packageName === ddzPackageName) {
		//   this.exitBattle();
		// }
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
				hardwareCode: this.state.uid,
				channel_id: channelID
			},
			(res) => {
				console.log(res);
				if (res.returnCode === '000000'){ // 约战未开始可以退出约战组
					this.setState({
						ExitRoomIdModalShow : false
					}, ()=>{
						this.isCloseDialog(true);
					});
				} else if (res.returnCode === '020407'){ // 约战已开始不可退出
					this.setState({
						ExitRoomIdModalShow : false,
						ExitTipsModalShow : true,
						showTips : '约战已开始,不可退出！'
					});
				} else { // 系统异常
					this.setState({
						ExitRoomIdModalShow : false,
						ExitTipsModalShow : true,
						showTips : '请求处理异常！'
					});
				}
			},
			(err) => {
				document.title = '退出约战组失败';
			}
		);
	}
	
	/**
	 * 是否关闭当前浏览器
	 * @param bool
	 */
	isCloseDialog(bool){
		if (bool){
			// 释放Saas SDK释放实例
			window.Cloudplay.stopGame();
			if (this.isWeiXin()) {
				wx.closeWindow(); // 关闭浏览器
			} else {
				this.props.history.goBack();
			}
		} else {
			this.setState({
				ExitTipsModalShow : false,
				ExitRoomIdModalShow : false
			});
		}
	}
	
	/**
	 * 获取用户包月信息
	 * @param id
	 */
	getMyService (id) {
		HttpRequest.getMyService(
			{
				user_id: id,
				channel_id: channelID
			},
			(res) => {
				if (res.service.length !== 0) {
					let services = [];
					res.service.forEach((item, index) => {
						services.push(item.service_id);
					});
					this.setState({
						services: services
					});
					this.checkUserRoomCard(services);
				} else {
					this.checkUserRoomCard([]);
				}
			},
			(err) => {
				this.checkUserRoomCard([]);
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
