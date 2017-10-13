/**
 * Created by chao on 2017/10/10.
 */

import wx from 'weixin-js-sdk';

import HttpRequest from '../utils/HttpRequest';
import img from '../assets/index.png';

export default class WeChat {

  static init (config) {
    console.log('改变path');
    wx.config(config);
  }

  static getWxConfig () {
    HttpRequest.getWxConfig(
      {
        activityCode:'123',
        url: window.location.href.split('#')[0]
      },
      (res) => {

      },
      (err) => {
        console.log(err);
      }
    );
    return {};
  }

  static ready () {
    wx.ready(() => {
      this.MenuShareTimeline();
      this.MenuShareAppMessage();
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
      title: '我就是测试的', // 分享标题
      link: encodeURIComponent(window.location.href.split('#')[0]), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: img, // 分享图标
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
