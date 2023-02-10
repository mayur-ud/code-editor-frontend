import React from 'react'
import {FaPlusCircle , FaFolder} from 'react-icons/fa'
import {AiFillSetting} from 'react-icons/ai'

import './RightPane.css'

function RightPane() {
  return (
    <div className='container'>
        <FaPlusCircle size={36} className='btn'  />
        <FaFolder size={36} className='btn' />
        <AiFillSetting size={36} className='btn'/>
        

    </div>
  )
}

export default RightPane