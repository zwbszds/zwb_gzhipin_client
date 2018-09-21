import React ,{Component} from 'react'
import {NavBar, List, InputItem} from 'antd-mobile'
import {connect} from 'react-redux'
//需要引入的异步action

import  {sendMsg} from "../../redux/actions";

const Item = List.Item


class Chat extends Component{

  state = {
    content:''
  }


  //发送数据的回调函数
  send = ()=>{
    //收集需要的数据
    //发送的内容
    const {content} = this.state
    //拿到发送者的id
    const from = this.props.user._id
    //拿到目标的id
    const to = this.props.match.params.userId

    //调用异步action发送请求

    this.props.sendMsg({content,from,to})
  }
  render () {
    return (
      <div id='chat-page'>
        <NavBar>aa</NavBar>
        <List>
          <Item
            thumb={require('../../assets/images/头像1.png')}
          >
            你好
          </Item>
          <Item
            thumb={require('../../assets/images/头像1.png')}
          >
            你好
          </Item>
          <Item
            className='chat-me'
            extra='我'
          >
            很好
          </Item>
          <Item
            className='chat-me'
            extra='我'
          >
            很好2
          </Item>
        </List>

        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            extra={
              <span onClick={this.send}>发送</span>
            }
            onChange={val => this.setState({content: val})}
          />
        </div>
      </div>
    )
  }
}


export default connect(
  state =>({user:state.user}),
  {sendMsg}
)(Chat)