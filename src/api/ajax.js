import axios from 'axios'

//封装ajax请求函数
export default function ajax (url,data={},type='GET') {
  if(type==='GET'){
    //判断是否有值，并且拼接到url
    let queryStr = ''

    Object.keys(data).forEach((key)=>{
       //拿到对应的value
      const value = data[key]

      //拼接查询字符串
      queryStr += `${key}=${value}&`

    })

  //判断queryStr是否存在
    if(queryStr){
      //处理queryStr
      queryStr = queryStr.substring(0,queryStr.length-1)

      //拼接url
      url +=`?${queryStr}`
    }





    return axios.get(url)
  }else{

    //post
    return axios.get(url,data)
  }

}