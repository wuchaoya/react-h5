/**
 * Created by chao on 2017/11/28.
 */

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
}