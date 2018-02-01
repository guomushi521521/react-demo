/**
 * Created by Administrator on 2018/1/17.
 */

import 'whatwg-fetch'

import {message} from 'antd';

// export const mainUrl='http://192.168.13.55:8090';
export const mainUrl='http://192.168.13.208:9140';
// export const mainUrl='http://192.168.13.16:8090';
// export const mainUrl='http://192.168.13.2:8090';
// export const mainUrl='http://192.168.13.88:8090';

let headers = new Headers();

headers.append('Content-Type', 'application/json');

headers.append('accessToken', sessionStorage.getItem('token'));

//code不等于0时的逻辑处理
function remind(json) {
  switch (json.code) {
    case 501 :
      message.error(json.msg);
      break;
    case 502 :
      message.error(json.msg);
      break;
    case 500 :
      message.error(json.msg);
      break;
    case 400 :
      message.error(json.msg);
      break;
    default:
      break;
  }
}

function fetchAll(dispatch, url, data, func, callback) {
  fetch(mainUrl + url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.code === 0) {
        callback(json);
        return dispatch(func(json))
      } else {
        remind(json)
      }
    })
}

function fetchCallback(url, data, func) {
  fetch(mainUrl + url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.code === 0) {
        func(json)
      } else {
        remind(json)
      }
    })
}

function fetchFunc(dispatch, url, data, func) {
  fetch(mainUrl + url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((json) => {
      dispatch(func(json));
      if (json.code === 0) {
        dispatch(func(json))
      } else {
        remind(json)
      }
    })
}

/*
* 统一使用fetchHttp()进行数据请求。根据传递的参数不同，进行不同的处理
*   如果传递过来的是四个参数，就表示即要用到Redux又要用到回调函数，就执行fetchAll()方法
*   如果传递过来的是三个参数，就需要判断第三个参数的类型，是actions函数，还是callback回调函数
*     因为callback函数都是匿名函数，把函数字符串化之后action函数的从开始到'('的长度一定比callback函数要长
*       利用这一点进行区分
*         如果是actions函数的话就执行fetchFunc()
*         否则执行fetchCallback()
* */
export function fetchHttp(url,data,func,callback) {

  if(callback){
    return dispatch => {
      return fetchAll(dispatch,url,data,func,callback)
    }
  }else {

    let funcType=func.toString().indexOf('(');

    if(funcType===9){
      return ()=> {
        return  fetchCallback(url,data,func)
      }
    }else{
      return dispatch=> {
        return  fetchFunc(dispatch,url,data,func)
      }
    }
  }
}