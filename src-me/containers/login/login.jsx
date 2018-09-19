import React ,{Component} from 'react'
import {NavBar, WingBlank, List, WhiteSpace, InputItem, Radio, Button} from 'antd-mobile'

import Logo from '../../component/logo/logo'


export default class Login extends Component{

  goRegister=()=>{
    this.props.history.replace('./register')
  }
  render(){
    return(



        <div>
          <NavBar>硅谷直聘</NavBar>
          <Logo/>
          <WingBlank>
            <List>

              <InputItem placeholder='请输入用户名' onChange = {val=>this.handleChange('username',val)}>用户名：</InputItem>
              <WhiteSpace/>
              <InputItem type= 'password'placeholder='请输入密码' onChange = {val=>this.handleChange('password',val)}>密码：</InputItem>
              <WhiteSpace/>


              <Button type='primary' onClick = {this.register}>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
              <Button onClick = {this.goRegister}>注册账户</Button>

              <WhiteSpace/>
            </List>

          </WingBlank>
        </div>


    )
  }
}