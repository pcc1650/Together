import React from "react"
import { store } from './ReduxStore.jsx'
import { getCookie } from './getCookie.jsx'
import { increment } from './Actions.jsx'
import { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as LoginComponentActions from './Actions'
import { BackgroundImage }from 'react-background-image-loader'


@connect(state => ({
    username: state.username
  }), dispatch => {return bindActionCreators(LoginComponentActions, dispatch)})
class LoginComponent extends React.Component{
  constructor(props){
    super(props)
    /*
    this.state={
      username: '',
      password: '',
    }
    */
  }
  // The submitHandler function is not in used
/*  submitHandler(e){
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
        store.dispatch({type: 'WRITE_USERNAME', payload: data['username']})
        self.props.router.push('/index')
      }
      else{
        alert(data['error'])
      }
    })
  }
  */
  registerHandler(e){
    e.preventDefault()
    browserHistory.push('/testApp/register')
  }

  render() {
    var hotpot = './Hotpot.jpeg'
    var csrftoken = getCookie('csrftoken');
    const { login } = this.props
    return (
      <div style={styleWrapper}>
        <div style= { styleTitle }>
          Sign in to
          Together
        </div>
        <div style={ styleSignin }>
        <form >
          <p style={ styleFont }>
            Username:
          </p>
          <p>
            <input className="form-control" type="text" name="username"  id="un" />
          </p>
          <p style={ styleFont }>
            Password:
          </p>
          <p>
            <input className="form-control" type="password" name="password"  id="pw" />
          </p>
          { /*<input type="hidden" name="csrfmiddlewaretoken" id="cs" value= {csrftoken} />*/ }
          <p className='btn btn-primary btn-block' type="button" onClick={()=>login({csrfmiddlewaretoken: csrftoken,
                username: document.getElementById("un").value,
                password: document.getElementById("pw").value})}>     Sign in     </p>
        </form>
          <div style={ styleRegister }>
            <p>New to Together?
            <a style = { styleLink } onClick={(evt)=>this.registerHandler(evt)}> Create an account. </a>
            </p>
          </div>
        </div>
      </div>
      )
    }
  }
/*
LoginComponent.propTypes = {
  counter: PropTypes.number.isRequired,
  incrementAsync: PropTypes.func.isRequired,
};
*/

var styleSignin = {
  backgroundPosition: "0% 0%",
  backgroundImage: "url(./static/image/Hotpot4.jpeg)",
  backgroundSize: "100%",
  height: "500px",
  marginTop: "20px",
  marginRight: "50px",
  marginBottom: "50px",
  marginLeft: "50px",
  backgroundColor: "#EEE",
  borderStyle: "solid",
  borderColor: "transparent",
  borderWidth: "5px",
  paddingLeft: "400px",
  paddingTop: "80px",
  paddingRight: "400px",
};

var styleTitle = {
  textAlign: "center",
  fontSize: "30px",
  marginTop: "30px",
  fontStyle: "italic",
  fontVariant: "small-caps",
  fontWeight: "bold",
};

var styleRegister = {
  marginTop: "20px",
  textAlign: "center",
  fontStyle: "italic",
};

var styleFont = {
  color: "white",
};

var styleLink = {
  cursor: "pointer",
}

var styleWrapper = {
	width: "1280px",	
}
export default LoginComponent
