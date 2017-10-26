/**
 * Created by chao on 2017/10/23.
 */

import { LOGIN, LOGINOUT, SERVICELISTDATA, GETMYSERVICELIS } from '../constants/constants';

const initialState = {
  login: false,
  serviceData: null,
  MyServiceId: '',
  userInfo:{
    id:'',
    name:'未登陆'
  }
};

export default function update (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, { login: action.state, userInfo: action.userInfo });
    case LOGINOUT:
      return Object.assign({}, state, { login: action.state });
    case SERVICELISTDATA:
      return Object.assign({}, state, { serviceData: action.data });
    case GETMYSERVICELIS:
      return Object.assign({}, state, { MyServiceId: action.id });
    default:
      return state;
  }
};
