/**
 * Created by chao on 2017/10/23.
 */

import { LOGIN, LOGINOUT } from '../constants/constants';

const initialState = {
  login: false
};

export default function update (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, { login: action.state })
    case LOGINOUT:
      return Object.assign({}, state, { login: action.state })
    default:
      return state;
  }
};
