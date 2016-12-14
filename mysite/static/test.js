var Component = React.createClass({
  getInitialState: function(){
    return {
      registerLabel: false,
      loginLabel: false,
      // logoutLabel: false,
      username: "111"
    }
  },
  changeRegisterLabel: function(){
    this.setState({registerLabel: !this.state.registerLabel})
  },
  // changeLogoutLabel: function(){
  //   this.setState({logoutLabel: !this.state.logoutLabel})
  // },
  changeLoginLabel: function(temp){
    this.setState({loginLabel: !this.state.loginLabel, username: temp})
  },
  changeLoginLabelNoPara: function(){
    this.setState({loginLabel: !this.state.loginLabel})
  },
  // componentDidMount: function(){
  //   var self = this
  //   setTimeout(function () {
  //     console.log('update props')
  //     self.setState({username: 'test1'})
  //   }, 1000);
  // },

  render: function() {
    if(this.state.loginLabel){
      return (
        <div>
          <AfterLoginComponent username={this.state.username} callChangeLoginLabelNoPara={this.changeLoginLabelNoPara}/>
        </div>
      )
    }
    else {
        if(this.state.registerLabel){
          return (
            <div>
              <RegisterComponent />
            </div>
          )
        }
        else{
          return (
            <div>
              <LoginComponent callChangeLoginLabel={this.changeLoginLabel} callChangeRegisterLabel={this.changeRegisterLabel}/>
            </div>
          )
        }
    }
  }
})
var AfterLoginComponent = React.createClass({
  clickHandler: function(e){
      e.preventDefault()
      var self = this
      $.get(
      "logout",
       function(data){
          if (data['success']){
              alert("Logout successfully!")
              self.props.callChangeLoginLabelNoPara()
          }else{
              alert(data['error'])
          }
      })
    },
  // $('#logout').on('click', clickHandler)
  render: function(){
    console.log('render')
      var text = 'Hello '+this.props.username
      return (
        <div>
          {text} &nbsp;
          <button className='btn btn-primary' onClick={this.clickHandler}>Logout</button>
        </div>
      )
    }
  })
var LoginComponent = React.createClass({
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
        self.props.callChangeLoginLabel(data['username'])
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
            <button className='btn btn-primary' onClick={this.props.callChangeRegisterLabel}>Register
            </button>
          </div>
          )
        }
      }
  )
// var LogoutComponent = React.createClass({
//   render: function(){
//     return(
//       <div>
//         <h2>alert("Logout successfully!")</h2>
//       </div>
//     )
//   }
// })
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
        alert("Register successfully")
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

ReactDOM.render(
  <Component />,
  document.getElementById('example')
)
