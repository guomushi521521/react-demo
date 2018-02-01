/**
 * Created by Administrator on 2018/1/16.
 */

import React, {Component} from 'react';
import {Button} from 'antd';
import {connect} from 'react-redux';
import {fetchRedux} from './../../actions/actions'
import {fetchHttp} from '../../fetch'
class Index extends Component {
  click = () => {
    this.props.history.push("/bb");
  };

  fetch = () => {
    let jsonData = {
      username: '1007',
      password: 'a123454678'
    };

    this.props.navFetch('/api/sys/menu/nav', jsonData, fetchRedux, (json) => {
      console.log(json)
    });
  };

  render() {
    return (
      <div className="App">
        <Button onClick={this.click} type="primary">跳转到bb页面</Button>
        <br/>
        {this.props.welcomeData ? this.props.welcomeData.code : 0}
        <br/>
        <Button onClick={this.fetch} type="primary">发送请求</Button>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    welcomeData: state.welcomeData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    navFetch: (url, data, func, callback) => dispatch(fetchHttp(url, data, func, callback)),
  }
}
const IndexApp = connect(mapStateToProps, mapDispatchToProps)(Index);

export default IndexApp;