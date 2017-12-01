/**
 * Created by chao on 2017/10/11.
 */

export default class DataProcess {
  /**
   *
   * @param data 要分类的数据
   * @param key  根据什么分类
   * @param arr  要分的类型
   * @returns {Array}
   * @constructor
   * example DataProcess.Filter(data,'type',[1, 2])
   */
  static Filter (data, key, arr) {
    let Arrs = [];
    arr.map((item, index) => {
      Arrs[key + index] = [];
    });
    data.map((obj, i) => {
      arr.map((item, index) => {
        if (obj[key] === item) {
          Arrs[key + index].push(obj);
        }
      });
    });
    return Arrs;
  }
};

