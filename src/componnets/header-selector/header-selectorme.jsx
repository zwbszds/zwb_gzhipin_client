import React ,{Component} from 'react'
import PropTypes from 'prop-types'
import {List,Grid} from 'antd-mobile'


export default class HeaderSelectorme extends Component{
  //声明
  static propTypes = {
    setHeader :PropTypes.func.isRequired
  }

  //设置改变的状态
  state = {
    icon :null
  }


  //设置头像的回调
  selectHeader = ({icon,text})=>{
  //更新icon
    this.setState = {
        icon
    }

    //调用父元素传过来的函数
    this.props.setHeader(text)
  }




  render(){

    //拿到Grid需要的参数

    let headerList = []

    for (let  i = 0; i < 20; i++) {

      headerList.push({
        //通过commonjs语法引入image
        icon: require('./images/头像'+(i+1)+'.png'),
        text:'头像'+(i+1)

      })

    }


    //动态设置headerUI

    const {icon} = this.state
    const headerUI = icon ? <div><span>已选择头像</span><img src={icon}/></div>: '请选择头像'

    return (
      <List renderHeader={() => headerUI}>
        <Grid data={headerList}
              columnNum={5}
              onClick={this.selectHeader}></Grid>
      </List>
    )
  }
}