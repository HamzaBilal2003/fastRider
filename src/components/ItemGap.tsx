import React from 'react'
interface props{
    children:React.ReactNode,
    className?: string;
}
const ItemGap : React.FC<props> = ({children,className}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>{children}</div>
  )
}

export default ItemGap