//这是一个普通的ui

import React from 'react'


import logo from './images/logo.png'
import './logo.less'
export default function Logo(props) {

  return (
    <div className='logo-container'>
      <img src={logo}alt="logo" className='logo'/>
    </div>
  )
}