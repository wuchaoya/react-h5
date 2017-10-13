/**
 * Created by chao on 2017/10/10.
 */

import wx from 'weixin-js-sdk';

import HttpRequest from '../utils/HttpRequest';
let desc = 'toptop是由海马玩打造的云手游社区，每天向玩家推荐全球精选游戏，同时依托海马云的移动内容云计算能力，在集游社的手机客户端和PC官网上都实现了手机游戏的免下载直接玩';
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
      title: document.title, // 分享标题
      desc: desc,
      link: encodeURIComponent(window.location.href.split('#')[0]), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=300%EF%BC%8A300%E5%9B%BE%E7%89%87&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&cs=1710122759,2828409116&os=3088705223,3245446613&simid=4253423853,761408430&pn=15&rn=1&di=24329415990&ln=1981&fr=&fmq=1507866555473_R&fm=rs2&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&hs=2&oriquery=300*300&objurl=http%3A%2F%2Fz.shixian.com%2Fassets%2Flogo-300-406cf2a4135690a879d66987aca1ce97c723a4a6103297b858557a4997423ccf.jpg&rpstart=0&rpnum=0&adpicid=0', // 分享图标
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
      link: encodeURIComponent(window.location.href.split('#')[0]), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=300%EF%BC%8A300%E5%9B%BE%E7%89%87&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&cs=1710122759,2828409116&os=3088705223,3245446613&simid=4253423853,761408430&pn=15&rn=1&di=24329415990&ln=1981&fr=&fmq=1507866555473_R&fm=rs2&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&hs=2&oriquery=300*300&objurl=http%3A%2F%2Fz.shixian.com%2Fassets%2Flogo-300-406cf2a4135690a879d66987aca1ce97c723a4a6103297b858557a4997423ccf.jpg&rpstart=0&rpnum=0&adpicid=0', // 分享图标
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
