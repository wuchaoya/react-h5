/**
 * Created by chao on 2017/10/23.
 */

import { LOGIN, LOGINOUT } from '../constants/constants';

export const login = () => {
  console.log('点击了');
  return {
    type: LOGIN,
    state: true
  };
};

export const loginOut = () => {
  return {
    type: LOGINOUT,
    state: false
  };
};

