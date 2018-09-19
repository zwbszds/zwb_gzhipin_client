//api接口函数创建

import ajax from './ajax'

const base = ''

//请求注册
export const reqRegister = ({username,password,type})=>ajax(`${base}/register`,{username,password,type},'POST')


//请求登录

export const reqLogin = ({username,password})=>ajax(`${base}/login`,{username,password},'POST')
