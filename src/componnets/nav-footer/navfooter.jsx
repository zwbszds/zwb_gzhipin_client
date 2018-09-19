

import React ,{Component} from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'


const Item = TabBar.Item

class NavFooter extends Component{

  static propTypes = {
    navList: PropTypes.array.isRequired
  }
  render(){

    //如果存在hide并且值为true就过滤掉，
    const navList = this.props.navList.filter(nav=> !nav.hide)

    //得到当前请求的路径 通过widthRouter让普通的组件可以使用路由组件中的三大对象
    const path = this.props.location.pathname


    return(
      <TabBar>
        {
          navList.map((nav,index)=>(
            <Item key = {index}
              icon={{uri: require(`./images/${nav.icon}.png`)}}
              selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
              selected={path===nav.path}
              onPress={() => this.props.history.replace(nav.path)}
              title={nav.text}

      />





          ))
        }
      </TabBar>
    )
  }
}


export default withRouter(NavFooter)//让navlist可以使用路由组件的三个对象