import {Router, Route, RouteHandler, DefaultRoute, hashHistory, browserHistory, IndexRoute} from "react-router"
import {store} from './ReduxStore.jsx'
import React from "react"
import ReactDOM from "react-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginComponent from './LoginComponent.jsx'
import {ManageComponent} from './ManageComponent.jsx'
import {SearchComponent} from './SearchComponent.jsx'
import PostComponent from './PostComponent.jsx'
import {RegisterComponent} from './RegisterComponent.jsx'
import IndexComponent from './IndexComponent.jsx'
import { Provider } from 'react-redux'





class RootComponent extends React.Component{
  componentWillMount(){
    var self = this
    $.get(
    "checkLoginState",
     function(data){
        if (data['logined']){
          store.dispatch({type: 'WRITE_USERNAME', payload: data['user']})
          console.log('has logined before')
          browserHistory.push('/testApp/index')
        }else{
          console.log('not login yet')
        }
    })
  }
  render(){
    return <div>{this.props.children}</div>
  }
}


ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/testApp/" component={RootComponent}>
        <IndexRoute component={LoginComponent}/>
        <Route path='index' component={IndexComponent}/>
        <Route path='register' component={RegisterComponent}/>
        <Route path='post' component={PostComponent}/>
        <Route path='search' component={SearchComponent}/>
        <Route path='manage' component={ManageComponent}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('example'));
