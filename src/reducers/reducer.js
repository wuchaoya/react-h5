/**
 * Created by chao on 2017/10/23.
 */

import { LOGIN, LOGINOUT, SERVICELISTDATA } from '../constants/constants';

const initialState = {
  login: false,
  serviceData: null
};

export default function update (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, { login: action.state });
    case LOGINOUT:
      return Object.assign({}, state, { login: action.state });
    case SERVICELISTDATA:
      return Object.assign({}, state, { serviceData: action.data });
    default:
      return state;
  }
};
