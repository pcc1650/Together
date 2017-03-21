export function increment(){
  return {
    type: 'ADD_AND_ALERT',
    payload: 5
  }
}

export function incrementAsync(delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment())
    }, delay)
  }
}


export function login(data) {
  return {
    type: 'LOGIN',
    payload: data
  }
}
