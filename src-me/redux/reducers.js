
//合并多个reducer函数，生成一个新的reducer函数
import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERROR_MSG} from './action-types'

const initUser = {
  username:'',
  type:'',
  msg:'',
  redirectTo: ''
}
function user(state = initUser,action) {
  switch (action.type){

    case AUTH_SUCCESS:
      const user = action.data
      return{...user,redirectTo:'/'}
    case ERROR_MSG:
      const msg = action.msg
      return{...state,msg}
    default:
      return state
  }
}



export default combineReducers({
  user

})

// 整合后的reducer管理的状态结构为:  对象: {xxx: xxx(), yyy: yyy()}
