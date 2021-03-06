/*
包含n个接口请求函数的模块
函数的返回值为: promise
 */
import ajax from './ajax'

// const BASE = 'http://localhost:4000'
const BASE = ''

// 请求注册接口
export const reqRegister = ({username, password, type}) => ajax(BASE+'/register', {username, password, type}, 'POST')

// 请求登陆接口
export const reqLogin = (username, password) => ajax(BASE+'/login', {username, password}, 'POST')

//请求更新的接口
export  const reqUpdateUser = (user) => ajax(BASE+'/update',user,'POST')

//请求当前用户的接口

export  const reqUser = ()=> ajax(BASE+'/user')


//获取用户列表
export  const reqUserList = (type) => ajax(BASE+'/userlist',{type})