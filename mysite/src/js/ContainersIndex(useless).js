import { connect } from 'react-redux'
import {IndexComponent} from './IndexComponent'
import { bindActionCreators } from 'redux'
import * as IndexComponentActions from './Actions'


function mapStateToProps(state){
  return {
    username: state.username
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(IndexComponentActions, dispatch)
}

export const VisiableIndexComponent = connect(mapStateToProps, mapDispatchToProps)(IndexComponent)
// export const VisiableLoginComponent = connect(state=>({counter:state.counter  }))(LoginComponent)
