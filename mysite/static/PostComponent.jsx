import React from "react"
import {store} from './ReduxStore.jsx'
import {getCookie} from './getCookie.jsx'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'


@connect(state=>({username: state.username}))
class PostComponent extends React.Component{
  submitHandler(e){
    e.preventDefault()
    var csrftoken = getCookie('csrftoken');
    var postInfo = {Title: document.getElementById('ti').value, Content: document.getElementById('co').value, Author: document.getElementById('au').value}
    fetch('post',
    {
      method: 'POST',
      body: JSON.stringify(postInfo),
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json', 'X-CSRFToken': csrftoken}
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
        if (data['success']){
          alert("Post successfully")
          browserHistory.push('/testApp/index')
        }
        else{
          alert(data['error'])
          browserHistory.push('/testApp')
        }
      }
    )
    /*
    var self = this
    $.post("post",
    {
      csrfmiddlewaretoken: $("#cs").val(),
      Title: $("#ti").val(),
      Content: $("#co").val(),
      Author: $("#au").val()
    },
    function(data){
      if (data['success']){
        alert("Post successfully")
        browserHistory.push('/testApp/index')
      }
      else{
        alert(data['error'])
        browserHistory.push('/testApp')
      }
    })
    */
  }
  render(){
    const { username } = this.props
    return (
      <div>
        Please post here!
        <form id="Post" onSubmit={(evt)=>this.submitHandler(evt)}>
          <p>
            Title: <input type="text" name="title"  id="ti"/>
          </p>
          <p>
            Content: <textarea  name="content"  id="co"/>
          </p>
          <p>
            Author: <input readOnly type="text" name="author" id="au" defaultValue= { username } />
          </p>
          <p>
          <input className='btn btn-primary' type="submit" value="post" id='submit'/>
          <a className='btn btn-primary' href="/testApp">return</a>
          </p>
        </form>
      </div>
    )
  }
}

export default PostComponent
