import React from "react"
import {store} from './ReduxStore.jsx'
import {getCookie} from './getCookie.jsx'


export class SearchComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      searchDataReturn: true,
      searchResult: store.getState()['postData']
    }
  }
  dataReturnFunc(){
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
          this.state.searchResult.map(function(temp){
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
  }
  dataNotReturnFunc(){
    return(
      <div>
      <p>No results matched!</p>
      </div>
    )
  }
  changeHandler(e){
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
  }
  render(){
    var csrftoken = getCookie('csrftoken');
    if(this.state.searchDataReturn){
      var func1=()=>this.dataReturnFunc()
    }
    else{
      var func1=()=>this.dataNotReturnFunc()
    }
    return(
      <div>
        <p>Please input keyword. We will find match posts for you. </p>
        <form id="loginPost" onSubmit={this.submitHandler}>
          <p>
            Keyword: <input type="text" name="search" id="se" onChange={(evt)=>this.changeHandler(evt)}/>
          </p>
          <input type="hidden" name="csrfmiddlewaretoken" id="cs" value= {csrftoken} />
        </form>
        <a className='btn btn-primary' href="/testApp">return</a>
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
}
