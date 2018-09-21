import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserList from '../../componnets/user-list/user-list'
import {getUserList} from '../../redux/actions'

/*
老板的主界面路由组件
 */
class Laoban extends Component {

  //在componentDidMount中发送请求

  componentDidMount(){
    this.props.getUserList('dashen')
  }

  render () {
    return (
      //拿到通过标签属性传过来的userlist
      <UserList userList={this.props.userList}></UserList>
    )
  }
}

export default connect(
  //拿到state中的userlist
  state => ({userList:state.userList}),
  //异步action
  {getUserList}
)(Laoban)