/**
 * Created by Administrator on 2018/1/16.
 */
import {combineReducers} from 'redux';
import * as types from './../actions/data'

export function profile(state = {}, action) {
  switch (action.type) {
    case types.PROFILE:
      return action.data;
    default:
      return state;
  }
}
export default combineReducers({
  profile,
});