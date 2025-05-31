import React from 'react'

interface props {
    children: React.ReactNode,
    havsShadow?: boolean
}

const HorizontalAlign: React.FC<props> = ({ children, havsShadow }) => {
    return (
        <div className={`py-4 flex flex-col lg:flex-row items-center gap-6 justify-between ${havsShadow && 'shadow-sm shadow-gray-300'}`}>
            {children}
        </div>
    )
}

export default HorizontalAlign