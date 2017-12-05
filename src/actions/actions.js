/**
 * Created by chao on 2017/10/23.
 */

import {
  LOGIN,
  LOGINOUT,
  SERVICELISTDATA,
  GETMYSERVICELIS,
  GETTIMELENGTH,
  GETEXTRAID
} from '../constants/constants';

import * as actionTypes from '../constants/constants'

/**
 * 首页数据
 * @param data
 * @param state
 * @returns {{type, data: *, state: *}}
 */
export function setHomeData (data, state) {
	return {
		type: actionTypes.SETHOMEDATA,
		data: data,
		state: state
	};
}
/**
 * 专题数据
 * @param data
 * @param state
 * @returns {{type, data: *, state: *}}
 */
export function setTopicData (data, state) {
	return {
		type: actionTypes.SETTOPICDATA,
		data: data,
		state: state
	};
}
/**
 * 游戏详情数据
 * @param data
 * @param state
 * @returns {{type, data: *, state: *}}
 */
export function setGameDetailsData (data, state) {
	return {
		type: actionTypes.SETGAMEDETAILSDATA,
		data: data,
		state: state
	};
}
/**
 * 用户数据
 * @param data
 * @param state
 * @returns {{type, data: *, state: *}}
 */
export function setUserData (data, state) {
	return {
		type: actionTypes.SETUSERDATA,
		data: data,
		state: state
	};
}
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

export const getExtraId = (id) => {
  return {
    type: GETEXTRAID,
    extraId: id
  };
};


export const getStateData = state => {
	return {
		stateData: state.update
	};
};

