import React from 'react'

const Button = ({text,onClick,className,type}) => {
  return (
    <button onClick={onClick} type={type} className={className}>{text}</button>
  )
}

export default Button