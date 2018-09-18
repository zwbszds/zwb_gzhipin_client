import React ,{Component} from 'react'
import {NavBar, WingBlank, List, WhiteSpace, InputItem, Radio, Button} from 'antd-mobile'


import {Redirect}from 'react-router-dom'
import {connect} from  'react-redux'
import {register,login}from '../../redux/actions'




import Logo from '../../component/logo/logo'

const ListItem = List.Item
class Register extends Component{

  //设置状态

  state = {
    username:'',
    password:'',
    password2:'',
    type:'dashen'
  }
//实时更新数据
  handleChange=(name,val)=>{
    this.setState({
      [name]:val

    })
  }

  register=()=>{
     //调用异步action发送请求
    this.props.register(this.state)

  }

  goLogin=()=>{
    this.props.history.replace('./login')
  }
  render(){

    const {type} = this.state
    const{msg,redirectTo} = this.props.user

    if(redirectTo) {
      // render函数中需要自动跳转
      return <Redirect to={redirectTo}></Redirect>
    }

    return(
      <div>
        <NavBar>硅谷直聘</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            {msg ? <p className='error-msg'>{msg}</p> : null}
            <InputItem placeholder='请输入用户名' onChange = {val=>this.handleChange('username',val)}>用户名：</InputItem>
            <WhiteSpace/>
            <InputItem type= 'password'placeholder='请输入密码' onChange = {val=>this.handleChange('password',val)}>密码：</InputItem>
            <WhiteSpace/>
            <InputItem type= 'password'placeholder='请输入确认密码' onChange = {val=>this.handleChange('password2',val)}>确认密码：</InputItem>
            <WhiteSpace/>
            <ListItem>
              <span>用户类型：</span>&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='laoban'} onChange = {()=>this.handleChange('type','laoban')}>老板</Radio>
              <Radio checked={type==='dashen'} onChange = {()=>this.handleChange('type','dashen')}>大神</Radio>
            </ListItem>
            <WhiteSpace/>
            <Button type='primary' onClick = {this.register}>注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</Button>
            <Button onClick = {this.goLogin}>已有账户</Button>
            <WhiteSpace/>
          </List>

        </WingBlank>
      </div>
    )
  }
}


// export default connect(
//   state=>({user:state.user}),
//   {register}
// )(Register)

export default connect(
  state => ({user: state.user}),  // {user: user()}
  {register}
)(Register)

