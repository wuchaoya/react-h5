/**
 * Created by chao on 2017/10/16.
 */

export default class History {
  static Splice (parameter) {
    let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
    for (let key in parameter) {
      url += key + '=' + parameter[key] + '&';
    }
    return url.slice(0, url.length - 1) + '#wechat_redirect';
  }
  static CodeUrl (parameter) {
    let url = 'https://api.weixin.qq.com/sns/oauth2/access_token?';
    for (let key in parameter) {
      url += key + '=' + parameter[key] + '&';
    }
    return url;
  }
  static UserInfoUrl (parameter) {
    let url = 'https://api.weixin.qq.com/sns/userinfo?';
    for (let key in parameter) {
      url += key + '=' + parameter[key] + '&';
    }
    return url;
  }
};
