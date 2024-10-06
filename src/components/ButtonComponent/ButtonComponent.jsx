
import React from 'react'
import { HoverButton } from './style'

const ButtonComponent = ({name, color='rgb(248, 75, 47)', width='120px', textColor='#fff', icon, onClick,  ...rest}) => {
    const style={
        minWidth: width,
        background: color,
        color: textColor,
    }
    return (
        <HoverButton style={style} icon={icon} onClick = {onClick ? onClick : null} {...rest}>
            {name}
        </HoverButton>
    )
}

export default ButtonComponent