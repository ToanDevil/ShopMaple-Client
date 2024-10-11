import { Spin } from 'antd'
import React from 'react'

const LoadingComponent = ({height = '70vh'}) => {
  return (
    <Spin size="large" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: height, 
      }}/>
  )
}

export default LoadingComponent