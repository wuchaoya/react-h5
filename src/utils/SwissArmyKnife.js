/**
 * Created by chao on 2017/11/28.
 */

import HttpRequest from './HttpRequest';
import WeChat from './WeChat';

export default class SwissArmyKnife {
	static setTitle (title) {
		document.title = title;
		return this;
	}
	static setColor (color) {
		document.getElementsByTagName('body')[0].style.backgroundColor = color;
		document.getElementsByTagName('body')[0].style.background = color;
		document.getElementsByTagName('html')[0].style.background = color;
		return this;
	}
	static GetQueryString (name) {
		let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		let r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	}
	static isWeiXin () {
		let ua = window.navigator.userAgent.toLowerCase();
		// eslint-disable-next-line
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}
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
	static getMyService (id, obj) {
		HttpRequest.getMyService(
			{
				user_id: id,
				channelId: '40129731334'
			},
			(res) => {
				obj.props.getMyService(res.service[0].service_id);
				this.getTimeLength(id, res.service[0].service_id, obj);
			},
			(err) => {
				console.log(err);
			}
		);
	}
	static getTimeLength (userId, id, obj) {
		HttpRequest.getTimeLength(
			{
				user_id: userId,
				service_id:[id],
				pkg:'',
				channelId: '40129731334'
			},
			(res) => {
				obj.props.getTimeLength(Number(res.result_time));
				obj.props.getExtraId(res.trace_unique_id);
			},
			(err) => {
				console.log(err);
			}
		);
	}
}