import React from 'react'
import Editor from '../components/Editor/Editor'
import LeftPane from '../components/Editor/LeftPane'
import RightPane from '../components/Editor/RightPane'

import './MainPage.css'

function MainPage() {
  return (<div className='cont'>
    <div className='left'>
        <LeftPane />
    </div>
    <div className='main'>
        <Editor/>
    </div>
    <div className='right'>
        <RightPane />
    </div>
    </div>
  )
}

export default MainPage