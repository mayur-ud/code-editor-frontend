import React from 'react'

function LeftPane({clients}) {

  console.log(clients , 'left pane');

  return (
    <div style={{
      margin : 0,
      position:'fixed',
      top:0
    }}>LeftPane</div>
  )
}

export default LeftPane