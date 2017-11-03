/**
 * Created by chao on 2017/10/23.
 */

import {
  LOGIN,
  LOGINOUT,
  SERVICELISTDATA,
  GETMYSERVICELIS,
  GETTIMELENGTH
} from '../constants/constants';

/**
 * 获取登陆信息
 * @param res
 * @returns {{type, state: boolean, userInfo: {id, name}}}
 */
export const login = (res) => {
  return {
    type: LOGIN,
    state: true,
    userInfo:{ id: res.id, name: res.name }
  };
};
/**
 * 退出登陆
 * @returns {{type, state: boolean}}
 */
export const loginOut = () => {
  return {
    type: LOGINOUT,
    state: false,
    userInfo:{
      id:'',
      name:'未登陆'
    }
  };
};
/**
 * 获取包月信息
 * @param data
 * @returns {{type, data: *}}
 */
export const getServiceData = (data) => {
  return {
    type: SERVICELISTDATA,
    data: data
  };
};
/**
 * 获取已开通包月信息
 * @param id
 * @returns {{type, id: *}}
 */
export const getMyService = (id) => {
  return {
    type: GETMYSERVICELIS,
    id: id
  };
};
/**
 * 获取剩余游戏时长
 * @param time
 */
export const getTimeLength = (time) => {
  return {
    type: GETTIMELENGTH,
    timeLength: time
  };
};

