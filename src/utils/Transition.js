/**
 * Created by chao on 2017/9/19.
 */
export default class Transition {
  static JsonToXml (json) {
    let xml = '';
    let arr = ['<', '>', '</'];
    for (let key in json) {
      if (Object.prototype.toString.call(json[key]) === '[object Object]') {
        xml += arr[0] + key + arr[1] + this.JsonToXml(json[key]) + arr[2] + key + arr[1];
      } else {
        xml += arr[0] + key + arr[1] + json[key] + arr[2] + key + arr[1];
      }
    }
    return xml;
  }
};
