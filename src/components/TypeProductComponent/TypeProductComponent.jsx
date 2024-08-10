import React from 'react'
import './style.js'
const TypeProductComponent = ({name, onClick}) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer', height: '44px', display: 'flex', alignItems: 'center', padding: '0 16px'}} >
        {name}
    </div>
  )
}

export default TypeProductComponent