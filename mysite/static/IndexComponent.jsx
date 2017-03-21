import React from "react"
import { store } from './ReduxStore.jsx'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import './css/index.css' 
import './css/banner.css'

@connect(state=>({username: state.username}))
class IndexComponent extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      dataReady: false
    }
  }
  componentWillMount(){
    var self = this
    $.get(
    "post",
     function(data){
       store.dispatch({'type': 'WRITE_POSTDATA', payload: data['postData']})
       self.setState({dataReady: true})
    })
  }
  dataReadyFunc(){
    return(
      <table className="table">
      <tbody>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Content</th>
          <th>Author</th>
        </tr>
        {
          store.getState()['postData'].map(function(temp){
            return (
              <tr key={temp['pk']}>
                <td>{temp['pk']}</td>
                <td>{temp['title']}</td>
                <td>{temp['content']}</td>
                <td>{temp['author']}</td>
              </tr>
            )
          })
        }
      </tbody>
      </table>
    )
  }
  dataNotReadyFunc(){
    return(
      <div>
        <h1>Please wait... </h1>
      </div>
    )
  }
  clickLogoutHandler(e){
    e.preventDefault()
    var self = this
    $.get(
    "logout",
     function(data){
        if (data['success']){
            alert("Logout successfully!")
            store.dispatch({type: 'WRITE_USERNAME', payload:''})
            browserHistory.push('/testApp/')
        }else{
            alert(data['error'])
        }
    })
  }
  clickPostHandler(e){
    e.preventDefault()
    browserHistory.push('/testApp/post')
  }
  clickSearchHandler(e){
    e.preventDefault()
    browserHistory.push('/testApp/search')
  }
  clickManageHandler(e){
    e.preventDefault()
    browserHistory.push('/testApp/manage')
  }
  render(){
    const { username } = this.props
    var text = 'Hello ' + username
    if(this.state.dataReady){
      var func1=this.dataReadyFunc
    }
    else{
      var func1=this.dataNotReadyFunc
    }
    return (
      <div>
		<div className="banner">
			<a className="afirst" href="/testApp/">Features</a>
			<a className="aremain" href="/testApp/">Explore</a>
			<a className="aremain" href="/testApp/">Pricing</a>
		</div>
        <div className="greeting">
          {text}
          <button className='btn btn-primary' onClick={(evt)=>this.clickLogoutHandler(evt)}>Logout</button>
        </div>
        <div>
          <button className='btn btn-primary' onClick={(evt)=>this.clickPostHandler(evt)}>Post</button>
          <button className='btn btn-primary' onClick={(evt)=>this.clickSearchHandler(evt)}>Search</button>
          <button className='btn btn-primary' onClick={(evt)=>this.clickManageHandler(evt)}>Manage</button>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Posts</div>
          <div className="panel-body">
            <p>These are posts available. Enjoy yourself!</p>
          </div>
          {
            func1()
          }
        </div>
      </div>
    )
  }
}

export default IndexComponent

