/**
 * Created by chao on 2017/10/23.
 */

import { LOGIN, LOGINOUT, SERVICELISTDATA, GETMYSERVICELIS } from '../constants/constants';

export const login = (res) => {
  console.log('点击了');
  return {
    type: LOGIN,
    state: true,
    userInfo:{ id: res.id, name: res.name }
  };
};

export const loginOut = () => {
  return {
    type: LOGINOUT,
    state: false
  };
};
export const getServiceData = (data) => {
  return {
    type: SERVICELISTDATA,
    data: data
  };
};
export const getMyService = (id) => {
  return {
    type: GETMYSERVICELIS,
    id: id
  };
};

