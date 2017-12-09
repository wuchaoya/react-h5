/**
 * Created by chao on 2017/10/23.
 */

import * as actionTypes from '../constants/constants';

const initialState = {
	homeData: null,
	homeDataState: -1,
	topicData: null,
	topicDataState: -1,
	gameDetailsData: null,
	gameDetailsDataState: -1,
	userData: null,
	userDataState: -1,
  login: false, // 登陆状态
  serviceData: null, // 开通包月数据
  MyServiceId: '', // 已开通包月id
  userInfo:{
    id:'',
    name:'未登录'
  }, // 已登陆的用户信息
  timeLength: null,
  extraId: null, // 时长id
	showLoginModal: false
};

export default function update (state = initialState, action) {
  switch (action.type) {
	  case actionTypes.SETHOMEDATA:
		  return Object.assign({}, state, {homeData: action.data, homeDataState: action.state});
	  case actionTypes.SETTOPICDATA:
		  return Object.assign({}, state, {topicData: action.data, topicDataState: action.state});
	  case actionTypes.SETGAMEDETAILSDATA:
		  return Object.assign({}, state, {gameDetailsData: action.data, gameDetailsDataState: action.state});
	  case actionTypes.SETUSERDATA:
		  return Object.assign({}, state, {userData: action.data, userDataState: action.state});
	  case actionTypes.LOGIN:
      return Object.assign({}, state, { login: action.state, userInfo: action.userInfo });
    case actionTypes.LOGINOUT:
      return Object.assign({}, state, { login: action.state,userInfo: action.userInfo });
    case actionTypes.SERVICELISTDATA:
      return Object.assign({}, state, { serviceData: action.data });
    case actionTypes.GETMYSERVICELIS:
      return Object.assign({}, state, { MyServiceId: action.id });
    case actionTypes.GETTIMELENGTH:
      return Object.assign({}, state, { timeLength: action.timeLength });
    case actionTypes.GETEXTRAID:
      return Object.assign({}, state, { extraId: action.extraId });
	  case actionTypes.SHOWLOGINMODAL:
	  	return Object.assign({}, state, { showLoginModal: action.state })
    default:
      return state;
  }
};
