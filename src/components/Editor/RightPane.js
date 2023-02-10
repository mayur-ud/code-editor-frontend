import React from 'react'
import {FaPlusCircle , FaFolder} from 'react-icons/fa'
import {AiFillSetting} from 'react-icons/ai'

import './RightPane.css'
import { Button } from '@mantine/core'

function RightPane({lang , setLang}) {
  return (
    <div className='container'>
        <FaPlusCircle size={36} className='btn'  />
        <FaFolder size={36} className='btn' />        

    </div>
  )
}

export default RightPane