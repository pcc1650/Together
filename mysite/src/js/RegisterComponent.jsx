import React from "react"
import { getCookie } from './getCookie.jsx'
import { browserHistory } from 'react-router'
import  '../css/register.css'
import '../css/banner.css'

export class RegisterComponent extends React.Component{
  submitHandler(e){
    e.preventDefault()
    var self = this
    if($("#un").val() == "" || $("#pw").val() == ""){
      alert("The username or password is blank!")
      return
    }
    if($("#pw").val() != $("#pwc").val()){
      alert("The password two times are different.")
      return
    }
    $.post("register",
    {
      csrfmiddlewaretoken: $("#cs").val(),
      username: $("#un").val(),
      password: $("#pw").val()
    },
    function(data){
      if (data['success']){
        alert('Register Successfully! Please login now !')
        browserHistory.push('/')
      }
      else{
        alert(data['error'])
      }
    })
  }
  render(){
    var csrftoken = getCookie('csrftoken');
    return (
	  <div className="wrapper">
		<div className="banner">
			<a className="afirst" href="/testApp/">Features</a>
			<a className="aremain" href="/testApp/">Explore</a>
			<a className="aremain" href="/testApp/">Pricing</a>
		</div>
		<div className="registerClass">
		  <div id="register">
			<h2>Create your personal account</h2>
			<form onSubmit={(evt)=>this.submitHandler(evt)}>
			  <p className="pinput">
				  Username:        
			  </p>
			  <p>
				  <input type="text" name="username" placeholder="Pick a username" id="un" className="form-control" /> 
			  </p>
			  <p className="pinput">
				  Password:       
			  </p>
			  <p>
				  <input type="password" name="password" placeholder="Create a password" id="pw" className="form-control"/>
			  </p>
			  <p className="pinput">
				  Comfirm Password: 
			  </p>
			  <p>
				  <input type="password" name="passwordComfirm" placeholder="Confirm the password" id="pwc" className="form-control"/>
			  </p>
			  <p>
			  <input type="hidden" name="csrfmiddlewaretoken" id="cs" value= {csrftoken} />
			  <input className='btn btn-primary' type="submit" value="Sign up for Together" id='submit'/>
			  <a className='btn btn-primary' href="/">return</a>
			  </p>
			</form>
		  </div>
		  <div id="intro">
			<h2>
			  You'll love Together
			</h2>
			<ul>
			  <li>Meet new friends</li>
			  <li>Play or eat together. e.g. Basketball, Singing, Hotpot</li> 
			  <li>Share joyful days</li>
			  <li>......</li>
			</ul>
			<div >
			  <img src="./image/basketball.jpeg"  width="320px" height="270px" />
			  <img src="./image/Hotpot1.jpeg"  width="320px" height="270px" />
			</div>
		  </div>
		</div>
	  </div>
    )
  }
}
