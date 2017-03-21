import React from "react"
import {Modal, Button} from "react-bootstrap"
import {store} from './ReduxStore.jsx'
import {getCookie} from './getCookie.jsx'


export class ManageComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      myPostsReturn: false,
      myPostsResult: {},
      showModal: false,
      singlePost: {}
    }
  }
  componentWillMount(){
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
  }
  modalOpen(id){
    var selectedPost
    Object.values(this.state.myPostsResult).map(function(temp){
      if(temp['pk'] == id){
        selectedPost = temp
      }
    })
    this.setState({showModal: true, singlePost: selectedPost})
  }
  modalClose(){
    this.setState({showModal: false})
  }
  clickUpdateHandler(id, e){
    e.preventDefault()
    // alert("comment test")
    // return ()=>{
    //   this.setState({showModal: true, singlePost: this.state.myPostsResult[id]})
    // }
    this.modalOpen(id)
  }
  clickSaveChangesHandler(e){
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
  }
  clickDeleteHandler(id, e){
    e.preventDefault()
    self = this
    $.ajax({
      headers: {
          'X-CSRFToken': getCookie('csrftoken')
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
  }
  dataReturnFunc(){
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
  }
  dataNotReturnFunc(){
    return(
      <div>
      <p>Sorry! You have not posted yet! </p>
      </div>
    )
  }
  render(){
    var csrftoken = getCookie('csrftoken');
    if(this.state.myPostsReturn){
      var func1=()=>this.dataReturnFunc()
    }
    else{
      var func1=()=>this.dataNotReturnFunc()
    }
    return (
      <div>
        <p>These are your posts. </p>
        <div>
          <a className='btn btn-primary' href="/testApp">return</a>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">My Posts</div>
          <div className="panel-body">
            <p>You can Update or Delete your posts! </p>
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
              Author: <input readOnly type="text" name="author" id="au" defaultValue= {store.getState()['username']} />
            <input type="hidden" name="userid" id="id" value= {this.state.singlePost['pk']} />
              <input type="hidden" name="csrfmiddlewaretoken" id="cs" value= {csrftoken} />
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={(evt)=>this.modalClose(evt)}>Close</Button>
            <Button bsStyle="primary" onClick={(evt)=>this.clickSaveChangesHandler(evt)}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
