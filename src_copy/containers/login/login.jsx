import React, {Component} from 'react'
import {NavBar, WingBlank, List, WhiteSpace, InputItem, Button} from 'antd-mobile'
import {connect}from'react-redux'

import Logo from '../../componnets/logo/logo'
import {login} from "../../../../180524_gzhipin-client/src/redux/actions";

/*
登陆路由组件
 */
 class Login extends Component {

  state = {
    username: '',
    password: '',
  }

  // 处理输入发生改变的监听回调
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  // 登陆的回调
  login = () => {
    //调用异步action
    const{username,password} = this.state
    this.props.login(username,password)
  }

  goRegister = () => {
    // 编程式路由导航(跳转)
    this.props.history.replace('/register')
  }

  render() {
    //判断
    const {redirectTo,mg}= this.props.user
    return (
      <div>
        <NavBar>硅谷直聘</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <InputItem
              placeholder='请输入用户名'
              onChange={val => this.handleChange('username', val)}
            >
              用户名:
            </InputItem>
            <WhiteSpace/>

            <InputItem
              type='password'
              placeholder='请输入密码'
              onChange={val => this.handleChange('password', val)}
            >
              密码:
            </InputItem>
            <WhiteSpace/>

            <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;陆</Button>
            <WhiteSpace/>
            <Button onClick={this.goRegister}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state = {user:state.user},
  {login}
)(Login)