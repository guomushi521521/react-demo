/**
 * Created by Administrator on 2018/1/16.
 */
import React from 'react'
import {Router, Route} from  'react-router-dom'
import App from './../components/App'
import Index from './../components/Index/Index'
import Aa from './../components/Aa/Aa'
import Bb from './../components/Bb/Bb'


class RouterMap extends React.Component {
  render() {
    return (
      <Router history={this.props.history}>
        <App>
          <Route exact path="/" component={Index}/>
          <Route path="/aa" component={Aa}/>
          <Route path="/bb" component={Bb}/>
        </App>
      </Router>
    )
  }
}

export default RouterMap