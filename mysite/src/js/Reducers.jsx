import { store } from './ReduxStore.jsx'

const defaultState = {counter: 0, username: "", postData: {}};
export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_AND_ALERT': {
      return Object.assign({},state,{
        counter: state.counter+=action.payload
      })
    }
    case 'LOGIN':{
      return state
    }
    case 'LOGIN_SUCC':{
      return Object.assign({},state,{
        username: action.payload
      })
    }
    case 'LOGIN_FAIL':{
      return state
    }
    case 'WRITE_USERNAME':{
      return Object.assign({},state,{
        username: action.payload
      })
    }
    case 'WRITE_POSTDATA':{
      return Object.assign({},state,{
        postData: action.payload
      })
    }
    default:
      return state
  }
};
