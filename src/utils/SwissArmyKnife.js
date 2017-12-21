/**
 * Created by chao on 2017/11/28.
 */

import HttpRequest from './HttpRequest';
import WeChat from './WeChat';

export default class SwissArmyKnife {
	
	/**
	 * 设置网页标题
	 * @param title
	 * @returns {SwissArmyKnife}
	 */
	static setTitle (title) {
		document.title = title;
		return this;
	}
	
	/**
	 * 设置页面背景颜色
	 * @param color
	 * @returns {SwissArmyKnife}
	 */
	static setColor (color) {
		document.getElementsByTagName('body')[0].style.backgroundColor = color;
		document.getElementsByTagName('body')[0].style.background = color;
		document.getElementsByTagName('html')[0].style.background = color;
		return this;
	}
	
	/**
	 * 获取url上的参数
	 * @param name
	 * @returns {null}
	 * @constructor
	 */
	static GetQueryString (name) {
		let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		let r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	}
	
	/**
	 * 判断是否是微信
	 * @returns {boolean}
	 */
	static isWeiXin () {
		let ua = window.navigator.userAgent.toLowerCase();
		// eslint-disable-next-line
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * 判断是否是ios
	 * @returns {boolean}
	 */
	static isIos () {
		if (navigator.userAgent.match(/iPad|iPhone/i)) {
			return true;
		}
		return false;
	}
	
	/**
	 * 初始化微信jsSdk
	 */
	static initWeChat () {
		if(!this.isWeiXin()) {return};
		HttpRequest.getWxConfig(
			{
				activityCode:'123',
				url: encodeURIComponent(window.location.href.split('#')[0])
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
			}
		);
	}
	
	/**
	 * 获取我的包月信息
	 * @param id
	 * @param obj
	 */
	static getMyService (id, _this) {
		HttpRequest.getMyService(
			{
				user_id: id,
				channelId: '40129731334'
			},
			(res) => {
				let services = [];
				if (res.service.length !== 0) {
					res.service.forEach((item) => {
						services.push(item.service_id);
					});
					_this.props.stateData.MyServiceId(services);
				} else {
					_this.props.stateData.MyServiceId([]);
				}
				this.getTimeLength(id, services, _this);
			},
			(err) => {
				console.log('获取我的包月失败', err);
			}
		);
	}
	
	/**
	 * 获取剩余时长
	 * @param userId
	 * @param id
	 * @param obj
	 */
	static getTimeLength (userId, id, _this) {
		HttpRequest.getTimeLength(
			{
				user_id: userId,
				service_id:[id],
				pkg:'',
				channelId: '40129731334'
			},
			(res) => {
				_this.props.stateData.timeLength(Number(res.result_time));
			},
			(err) => {
				console.log('获取时长失败', err);
			}
		);
	}
	
	/**
	 * 路由跳转
	 * @param path
	 * @param data
	 * @param _this || this.func = this.func.bind(this)
	 */
	static historyPush (path,data,_this) {
		_this || (_this = this);
		_this.props.history.push(path, data);
	}
	
	/**
	 * 拷贝一个对象或者数组
	 * @param parameter
	 * @returns {*}
	 */
	static clone (parameter) {
		switch (Object.prototype.toString.call(parameter)) {
			case '[object Array]':
				return [].concat(parameter);
			case '[object Object]':
				return Object.assign({}, parameter);
			default:
				return parameter;
		}
	}
	
	/**
	 *查询元素是否存在，返回所在位置
	 */
	static indexOf (item, arr) {
		let i = -1;
		arr.forEach((chart, index) => {
			if (item === chart) {
				i = index;
			}
		});
		return i
	}
};
