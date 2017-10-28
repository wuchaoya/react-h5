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

const initialState = {
  login: false, // 登陆状态
  serviceData: null, // 开通包月数据
  MyServiceId: '', // 已开通包月id
  userInfo:{
    id:'',
    name:'未登陆'
  }, // 已登陆的用户信息
  timeLength: null
};

export default function update (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, { login: action.state, userInfo: action.userInfo });
    case LOGINOUT:
      return Object.assign({}, state, { login: action.state,userInfo: action.userInfo });
    case SERVICELISTDATA:
      return Object.assign({}, state, { serviceData: action.data });
    case GETMYSERVICELIS:
      return Object.assign({}, state, { MyServiceId: action.id });
    case GETTIMELENGTH:
      return Object.assign({}, state, { timeLength: action.timeLength });
    default:
      return state;
  }
};
