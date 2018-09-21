import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
//引入特殊的cookie
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'

import NavFooter from '../../componnets/nav-footer/navfooter'
import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import {connect} from 'react-redux'
import {getRedirectPath} from '../../utils'

import {getUser} from '../../redux/actions'
import Chat from '../chat/chat';


/*
主界面路由组件
 */
class Main extends Component {

  //监视默认的状态
  navList = [
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]

  //在render中不能发送请求

  componentDidMount(){
    //判断是否有useid
    const userid = Cookies.get('userid')
    const {_id} = this.props.user

    if(userid&&!_id) {
      //发送请求
      this.props.getUser()
    }

    //判断redux中的user是不是没有数据

  }


  render () {
    // 1. 判断cookie中是否有userid, 如果没有, 自动跳转到登陆界面
    const userid = Cookies.get('userid')


    if(!userid) {
      return <Redirect to='/login'/>
    }

   // 2. cookie中有userid(登陆过), 看redux中的user有没有信息, 如果没有(还没有登陆), 发异步请求获取user信息并保存到redux
    const {user} = this.props
    if(!user._id){
      return <div>Loading........</div>
    }


    // 3. 如果redux的user中已经有信息(已经登陆), 如果请求的是应用根路径, 自动跳转到对应的主界面

    const path = this.props.location.pathname

    if(path==='/'){
      return <Redirect to={getRedirectPath(user.type,user.header)}/>
    }


    //拿到组件实例对象上的navlist
    const navList = this.navList
    

    
    //navList数组中存在许多的nav对象
    //找到当前的nav
    const currentNav = navList.find(nav=>path===nav.path)

    // 动态确定哪个nav需要隐藏
    
    const {type} = this.props.user
    if(type==='laoban'){
      navList[1].hide = true
      
    }else{
      navList[0].hide = true
    }



    return (
     <div>
       {currentNav? <NavBar>{currentNav.title}</NavBar>:null}
       <Switch>
         <Route path='/laobaninfo' component={LaobanInfo}/>
         <Route path='/dasheninfo' component={DashenInfo}/>

         <Route path='/laoban' component={Laoban}/>
         <Route path='/dashen' component={Dashen}/>
         <Route path='/message' component={Message}/>
         <Route path='/personal' component={Personal}/>

         {/*//chat路由*/}
         <Route path='/chat/:userid' component={Chat}/>

       </Switch>
       {/*
       把数据通过标签属性传递给子组件*/}
       {currentNav? <NavFooter navList = {this.navList}/>:null}
     </div>
    )
  }
}

export default connect(
  state =>({user:state.user}),
{getUser}
)(Main)