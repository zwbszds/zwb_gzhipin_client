/*
包含n个action creator函数的模块
同步action: 对象
异步action: dispatch函数
 */

import io from 'socket.io-client'
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList
} from '../api'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST
} from './action-types'


// 注册/登陆成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data:user})
// 注册/登陆失败的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data:msg})

// 接收用户的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
// 重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
//获取用户列表的同步action
export  const receiveUserList = (userList)=>({type: RECEIVE_USER_LIST,data:userList})



/*
注册的异步action
 */

//前台表单验证

export function register({username, password,password2, type}) {


  //现在操作的是errorMsg()返回的是一个普通的action对象
  if (!username){
    return errorMsg('必须指定用户名')
  }else if(!password){
    return errorMsg('请输入密码')
  }else if(password!==password2){
    return errorMsg('两次输入的密码不一致')
  }else if(!type){
    return  errorMsg('必须指定用户类型')
  }

  return async dispatch => {
    // 发异步ajax请求注册
    const response = await reqRegister({username, password, type})

    const result = response.data // {code:0/1, msg: '', data: user}
    if(result.code==0) { // 成功了
      const user = result.data
      // 分发成功的同步action
      dispatch(authSuccess(user))
    }else{ // 失败
      const msg = result.msg
      // 分发失败同步action
      dispatch(errorMsg(msg))
    }
  }
}

/*
登陆的异步action
 */
export function login(username, password) {
  return async dispatch => {


//此时是在dispatch函数中分发一个同步action

    if(!username) {  // 必须分发一个同步action对象
      return dispatch(errorMsg('必须指定用户名'))  // 此时 return代表结束
    } else if (!password) {
      return dispatch(errorMsg('必须指定密码'))
    }
    // 发异步ajax请求注册
    const response = await reqLogin(username, password)

    const result = response.data // {code:0/1, msg: '', data: user}
    if(result.code==0) { // 成功了
      const user = result.data
      // 分发成功的同步action
      dispatch(authSuccess(user))
    } else { // 失败
      const msg = result.msg
      // 分发失败同步action
      dispatch(errorMsg(msg))
    }
  }
}

//更新用户的异步action

export function updateUser(user) {
  return async dispatch =>{

     const response = await reqUpdateUser(user)

    const result = response.data

    if(result.code===0){
       const user = result.data
       dispatch(receiveUser(user))
    }else{
       const msg = result.msg
       dispatch(resetUser(msg))
    }
  }

}


//验证用户的异步action

export function getUser() {

  return async dispatch =>{

    const response = await reqUser()
    const result = response.data

    if(result.code===0){
      //发送成功的同步action请求
      dispatch(receiveUser(result.data))
    }else{
      dispatch(resetUser(result.msg))
    }

  }
}

//获取用户列表发送请求的action

export function getUserList(type) {

  return async dispatch =>{

    const response = await reqUserList(type)
    const result = response.data

    if(result.code ===0){
      dispatch(receiveUserList(result.data))
    }
  }
}


//获取聊天信息的异步action
//
//连接远程数据库

const socket = io('ws://localhost:4000')

//绑定监听，接受数据
socket.on('receiveMsg',(chatMsg)=>{

  console.log('这是浏览器端接受得请求'+chatMsg);

})


export function sendMsg({content, from, to}) {
return dispatch=>{

  socket.emit('sendMsg',{content, from, to})

  console.log('这是浏览器端发送的数据',{content, from, to})
}

}