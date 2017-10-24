/**
 * Created by chao on 2017/10/23.
 */

import { combineReducers } from 'redux'; // 利用combineReducers 合并reducers
import update from './reducer';// 引入update这个reducer

export default combineReducers({
  update
});
