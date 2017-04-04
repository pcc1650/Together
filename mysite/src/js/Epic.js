import { Observable } from 'rxjs'
import { browserHistory } from 'react-router'
export const appEpic = action$ =>
  action$.ofType('LOGIN')
  .mergeMap(action$=>{return Observable.fromPromise(
    fetch('index', {method: 'POST', body: JSON.stringify(action$.payload), credentials: 'same-origin', headers: {'Content-Type': 'application/json', 'X-CSRFToken': action$.payload.csrfmiddlewaretoken}})
    .then(function(response) {
      return response.json();
    })
  )
  .map(function f(data){
    if(data['success']){
      browserHistory.push('/testApp/index')
      return {
        type: 'LOGIN_SUCC',
        payload: data['username']
      }
    }
    else{
      alert(data['error'])
      return {
        type: 'LOGIN_FAIL',
        payload: data
      }
    }
  })
})
