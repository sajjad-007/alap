import React from 'react'

const Images = ({source,alt,className}) => {
  return (
    <img src={source} alt={alt} className={className}/>
  )
}

export default Images