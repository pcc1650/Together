import {Router, Route, RouteHandler, DefaultRoute, hashHistory, browserHistory, IndexRoute} from "react-router"
import {Modal, Button} from "react-bootstrap"
import React from "react"
import ReactDOM from "react-dom"
import 'bootstrap/dist/css/bootstrap.min.css'


var store = {username: "",postData: {}};

var RootComponent = React.createClass({
  componentWillMount: function(){
    var self = this
    $.get(
    "checkLoginState",
     function(data){
        if (data['logined']){
          store['username'] = data['user']
          console.log('has logined before')
          self.props.router.push('/index')
        }else{
          console.log('not login yet')
        }
    })
  },
  render: function(){
    return <div>{this.props.children}</div>
  }
})

var IndexComponent = React.createClass({
  getInitialState: function() {
    return {dataReady: false}
  },
  componentWillMount: function(){
    var self = this
    $.get(
    "post",
     function(data){
        store['postData'] = data['postData']
        self.setState({dataReady: true})
    })
  },
  dataReadyFunc: function(){
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
          Object.values(store['postData']).map(function(temp){
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
  },
  dataNotReadyFunc: function(){
    return(
      <div>
        <h1>Please wait... </h1>
      </div>
    )
  },
  clickLogoutHandler: function(e){
    e.preventDefault()
    var self = this
    $.get(
    "logout",
     function(data){
        if (data['success']){
            alert("Logout successfully!")
            store['username'] = ''
            self.props.router.push('/')
        }else{
            alert(data['error'])
        }
    })
  },
  clickPostHandler: function(e){
    e.preventDefault()
    this.props.router.push('/post')
  },
  clickSearchHandler: function(e){
    e.preventDefault()
    this.props.router.push('/search')
  },
  clickManageHandler: function(e){
    e.preventDefault()
    this.props.router.push('/manage')
  },
  render: function(){
    var text = 'Hello ' + store['username']
    if(this.state.dataReady){
      var func1=this.dataReadyFunc
    }
    else{
      var func1=this.dataNotReadyFunc
    }
    return (
      <div>
        <div>
          {text} &nbsp; {this.state.dataReady}
          <button className='btn btn-primary' onClick={this.clickLogoutHandler}>Logout</button>
        </div>
        <div>
          <button className='btn btn-primary' onClick={this.clickPostHandler}>Post</button>
          <button className='btn btn-primary' onClick={this.clickSearchHandler}>Search</button>
          <button className='btn btn-primary' onClick={this.clickManageHandler}>Manage</button>
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
})

var LoginComponent = React.createClass({
  handleRegisterButton: function(e){
    e.preventDefault()
    this.props.router.push('/register')
  },
  submitHandler: function(e){
    e.preventDefault()
    var self = this
    $.post("index",
    {
      csrfmiddlewaretoken: $("#cs").val(),
      username: $("#un").val(),
      password: $("#pw").val()
    },
    function(data){
      if (data['success']){
        store['username'] = data['username']
        self.props.router.push('/index')
      }
      else{
        alert(data['error'])
      }
    })
  },
  getCookie: function(name) {
    var cookieValue = "";
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  },
  render: function() {
    var csrftoken = this.getCookie('csrftoken');
    return (
      <div>
        Please login first!!!
        <form id="loginPost" onSubmit={this.submitHandler}>
          <p>
            Username: <input type="text" name="username"  id="un"/>
          </p>
          <p>
            Password: <input type="password" name="password"  id="pw"/>
          </p>
          <input type="hidden" name="csrfmiddlewaretoken" id="cs" value= {csrftoken} />
          <input className='btn btn-primary' type="submit" value="Login" id='submit'/>
        </form>
        <a className='btn btn-primary' href="#/register"> Register</a>
      </div>
      )
    }
  }
)

var RegisterComponent = React.createClass({
  submitHandler: function(e){
    e.preventDefault()
    var self = this
    $.post("register",
    {
      csrfmiddlewaretoken: $("#cs").val(),
      username: $("#un").val(),
      password: $("#pw").val()
    },
    function(data){
      if (data['success']){
        alert('Register Successfully! Please login now !')
        self.props.router.push('/')
      }
      else{
        alert(data['error'])
      }
    })
    },
  getCookie: function(name) {
    var cookieValue = "";
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  },
  render: function(){
    var csrftoken = this.getCookie('csrftoken');
    return (
      <div>
        <h2>Register Here</h2>
        <form onSubmit={this.submitHandler}>
          <p>
            Username: <input type="text" name="username"  id="un"/>
          </p>
          <p>
            Password: <input type="password" name="password"  id="pw"/>
          </p>
          <input type="hidden" name="csrfmiddlewaretoken" id="cs" value= {csrftoken} />
          <input className='btn btn-primary' type="submit" value="Register" id='submit'/>
        </form>
      </div>
    )
  }
})

var PostComponent = React.createClass({
  submitHandler: function(e){
    e.preventDefault()
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
        self.props.router.push('/index')
      }
      else{
        alert(data['error'])
        self.props.router.push('/')
      }
    })
  },
  getCookie: function(name) {
    var cookieValue = "";
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  },
  render: function(){
    var csrftoken = this.getCookie('csrftoken');
    return (
      <div>
        Please post here!
        <form id="Post" onSubmit={this.submitHandler}>
          <p>
            Title: <input type="text" name="title"  id="ti"/>
          </p>
          <p>
            Content: <textarea  name="content"  id="co"/>
          </p>
          <p>
            Author: <input readOnly type="text" name="author" id="au" defaultValue= {store['username']} />
          </p>
          <p>
          <input type="hidden" name="csrfmiddlewaretoken" id="cs" value= {csrftoken} />
          <input className='btn btn-primary' type="submit" value="post" id='submit'/>
          <a className='btn btn-primary' href="">return</a>
          </p>
        </form>
      </div>
    )
  }
})

var SearchComponent = React.createClass({
  getInitialState: function(){
    return {searchDataReturn: true, searchResult: store['postData']}
  },
  dataReturnFunc: function(){
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
          Object.values(this.state.searchResult).map(function(temp){
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
  },
  dataNotReturnFunc: function(){
    return(
      <div>
      <p>No results matched!</p>
      </div>
    )
  },
  changeHandler: function(e){
    e.preventDefault()
    var self = this
    $.post("search",
    {
      csrfmiddlewaretoken: $("#cs").val(),
      search: $("#se").val(),
    },
    function(data){
      if (data['success']){
        self.setState({searchDataReturn:true, searchResult: data['searchResult']})
      }
      else{
        self.setState({searchDataReturn: false})
      }
    })
  },
  getCookie: function(name) {
    var cookieValue = "";
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  },
  render: function(){
    var csrftoken = this.getCookie('csrftoken');
    if(this.state.searchDataReturn){
      var func1=this.dataReturnFunc
    }
    else{
      var func1=this.dataNotReturnFunc
    }
    return(
      <div>
        <p>Please input keyword. We will find match posts for you. </p>
        <form id="loginPost" onSubmit={this.submitHandler}>
          <p>
            Keyword: <input type="text" name="search" id="se" onChange={this.changeHandler}/>
          </p>
          <input type="hidden" name="csrfmiddlewaretoken" id="cs" value= {csrftoken} />
        </form>
        <a className='btn btn-primary' href="">return</a>
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
})

var ManageComponent = React.createClass({
  getInitialState: function(){
    return {myPostsReturn: false, myPostsResult: {}, showModal: false, singlePost: {}}
  },
  componentWillMount: function(){
    var self = this
    $.get(
    "manage",
     function(data){
       if(data['success']){
         self.setState({myPostsReturn: true, myPostsResult: data['myPostsData']})
       }
       else{
         self.setState({myPostsReturn: false})
       }
    })
  },
  getCookie: function(name) {
    var cookieValue = "";
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  },
  modalOpen: function(id){
    this.setState({showModal: true, singlePost: this.state.myPostsResult[id]})
  },
  modalClose: function(){
    this.setState({showModal: false})
  },
  clickUpdateHandler: function(id, e){
    e.preventDefault()
    // alert("comment test")
    // return ()=>{
    //   this.setState({showModal: true, singlePost: this.state.myPostsResult[id]})
    // }
    this.modalOpen(id)
  },
  clickSaveChangesHandler: function(e){
    e.preventDefault()
    self = this
    $.ajax({
      headers: {
          'X-CSRFToken': $("#cs").val()
      },
      type: "PUT",
      url: "post/"+this.state.singlePost['pk'],
      data: {"Title": $("#ti").val(), "Content": $("#co").val()},
      success: function(data) {
        alert('Updated Successfully')
        self.modalClose()
        $.get(
        "manage",
         function(data){
           if(data['success']){
             self.setState({myPostsReturn: true, myPostsResult: data['myPostsData']})
           }
           else{
             self.setState({myPostsReturn: false})
           }
        })
      }
    })
  },
  clickDeleteHandler: function(id, e){
    e.preventDefault()
    self = this
    $.ajax({
      headers: {
          'X-CSRFToken': self.getCookie('csrftoken')
      },
      type: "DELETE",
      url: "post/"+id,
      success: function(data) {
        alert("Delete post successfully!")
        $.get(
        "manage",
         function(data){
           if(data['success']){
             self.setState({myPostsReturn: true, myPostsResult: data['myPostsData']})
           }
           else{
             self.setState({myPostsReturn: false})
           }
        })
      }
    })
  },
  dataReturnFunc: function(){
    self = this
    return(
      <table className="table">
      <tbody>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Content</th>
          <th>Author</th>
          <th>Manage</th>
        </tr>
        {
          Object.values(this.state.myPostsResult).map(function(temp){
            return (
              <tr key={temp['pk']}>
                <td>{temp['pk']}</td>
                <td>{temp['title']}</td>
                <td>{temp['content']}</td>
                <td>{temp['author']}</td>
                <td>
                  <Button className='btn btn-primary' id={temp['pk']} onClick={(evt) => self.clickUpdateHandler(temp['pk'], evt)}>Update</Button>
                  <Button className='btn btn-primary' id={temp['pk']} onClick={(evt) => self.clickDeleteHandler(temp['pk'], evt)}>delete</Button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
      </table>
    )
  },
  dataNotReturnFunc: function(){
    return(
      <div>
      <p>Sorry! You have not posted yet! </p>
      </div>
    )
  },
  render: function(){
    var csrftoken = this.getCookie('csrftoken');
    if(this.state.myPostsReturn){
      var func1=this.dataReturnFunc
    }
    else{
      var func1=this.dataNotReturnFunc
    }
    return (
      <div>
        <p>These are your posts. </p>
        <div>
          <a className='btn btn-primary' href="">return</a>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">My Posts</div>
          <div className="panel-body">
            <p>You can Update or delete your posts! </p>
          </div>
          {
            func1()
          }
        </div>
        <Modal show={this.state.showModal}>
          <Modal.Header>
            <Modal.Title>Update your post</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              Title: <input type="text" name="title"  id="ti" defaultValue= {this.state.singlePost['title']}/>
            </p>
            <p>
              Content: <textarea  name="content"  id="co" defaultValue= {this.state.singlePost['content']}/>
            </p>
            <p>
              Author: <input readOnly type="text" name="author" id="au" defaultValue= {store['username']} />
            <input type="hidden" name="userid" id="id" value= {this.state.singlePost['pk']} />
              <input type="hidden" name="csrfmiddlewaretoken" id="cs" value= {csrftoken} />
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.modalClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.clickSaveChangesHandler}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
})



// var login = React.createClass({
//   componentDidMount: function (){
//     setTimeout(function () {
//       hashHistory.push('/signin')
//     }, 1000);
//   },
//   render:function(){
//     return <div>LOGIN</div>
//   }
// })
// var signin = function(){return <div>SINGIN</div>}



ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={RootComponent}>
      <IndexRoute component={LoginComponent}/>
      <Route path='index' component={IndexComponent}/>
      <Route path='register' component={RegisterComponent}/>
      <Route path='post' component={PostComponent}/>
      <Route path='search' component={SearchComponent}/>
      <Route path='manage' component={ManageComponent}/>
    </Route>
  </Router>
), document.getElementById('example'));
