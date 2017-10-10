/**
 * Created by chao on 2017/10/10.
 */

import wx from 'weixin-js-sdk';

export default class WeChat {

  static init () {
    wx.config(this.getWxConfig());
  }

  static getWxConfig () {}

  static ready () {
    wx.ready(() => {
      this.MenuShareTimeline();
      this.MenuShareAppMessage();
    });
  }

  static error () {
    wx.error(() => {});
  }

  /**
   * 分享到朋友圈
   * @constructor
   */
  static MenuShareTimeline () {
    wx.onMenuShareTimeline({
      title: '', // 分享标题
      link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: '', // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
  }

  /**
   * 分享给朋友
   * @constructor
   */
  static MenuShareAppMessage () {
    wx.onMenuShareAppMessage({
      title: '', // 分享标题
      desc: '', // 分享描述
      link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: '', // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
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
      title: '', // 分享标题
      desc: '', // 分享描述
      link: '', // 分享链接
      imgUrl: '', // 分享图标
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
      title: '', // 分享标题
      desc: '', // 分享描述
      link: '', // 分享链接
      imgUrl: '', // 分享图标
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
      title: '', // 分享标题
      desc: '', // 分享描述
      link: '', // 分享链接
      imgUrl: '', // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
  }

};
