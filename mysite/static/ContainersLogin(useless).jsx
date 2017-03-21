import { connect } from 'react-redux'
import {LoginComponent} from './LoginComponent'
import { bindActionCreators } from 'redux'
import * as LoginComponentActions from './Actions'

function mapStateToProps(state){
  return {
    counter: state.counter,
    username: state.username
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(LoginComponentActions, dispatch)
}

export const VisiableLoginComponent = connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
// export const VisiableLoginComponent = connect(state=>({counter:state.counter  }))(LoginComponent)
