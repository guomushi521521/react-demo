/**
 * Created by Administrator on 2018/1/16.
 */

import * as types from './data'

export function fetchRedux(data) {
  return {
    type: types.PROFILE,
    data
  }
}