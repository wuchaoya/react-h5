/**
 * Created by chao on 2017/10/10.
 */

import wx from 'weixin-js-sdk';
import icon from '../assets/icon.png';
import HttpRequest from '../utils/HttpRequest';
let desc = '喜迎十九大，欢乐斗地主  凑满三人，立即开打！';
export default class WeChat {
  static checkJsApi () {
    wx.checkJsApi({
      jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function(res) {
        console.log(res)
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      }
    });
  }
  static init (config) {
    wx.config(config);
  }

  static getWxConfig () {
    HttpRequest.getWxConfig(
      {
        activityCode:'123',
        url: window.location.href.split('#')[0]
      },
      (res) => {
        console.log(res);
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
        console.log(err);
      }
    );
  }

  static ready () {
    wx.ready(() => {
      this.MenuShareTimeline();
      this.MenuShareAppMessage();
      this.MenuShareQQ();
      this.MenuShareQZone();
      this.MenuShareWeibo();
    });
  }

  static error () {
    wx.error(() => {
      console.log('验证失败');
    });
  }

  /**
   * 分享到朋友圈
   * @constructor
   */
  static MenuShareTimeline () {
    wx.onMenuShareTimeline({
      title: document.title, // 分享标题
      desc: desc,
      link: encodeURI(window.location.href.split('#')[0]), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: icon, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        console.log('分享成功');
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        console.log('分享取消');
      }
    });
  }

  /**
   * 分享给朋友
   * @constructor
   */
  static MenuShareAppMessage () {
    wx.onMenuShareAppMessage({
      title: document.title, // 分享标题
      desc: desc, // 分享描述
      link: encodeURI(window.location.href.split('#')[0]), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: icon, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
  }

  /**
   * 分享给qq
   * @constructor
   */
  static MenuShareQQ () {
    wx.onMenuShareQQ({
      title: document.title, // 分享标题
      desc: desc, // 分享描述
      link: encodeURI(window.location.href.split('#')[0]), // 分享链接
      imgUrl: icon, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
  }

  /**
   * 分享到qq空间
   * @constructor
   */
  static MenuShareQZone () {
    wx.onMenuShareQZone({
      title: document.title, // 分享标题
      desc: desc, // 分享描述
      link: encodeURI(window.location.href.split('#')[0]), // 分享链接
      imgUrl: icon, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
  }

  /**
   * 分享到微博
   * @constructor
   */
  static MenuShareWeibo () {
    wx.onMenuShareWeibo({
      title: document.title, // 分享标题
      desc: desc, // 分享描述
      link: encodeURI(window.location.href.split('#')[0]), // 分享链接
      imgUrl: icon, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
  }
};
