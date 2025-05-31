import React from 'react'

interface props {
    bgColor?: string;
    TextColor?: string;
    handleFunction?: (data?: any) => void;
    className?:string;
    children: React.ReactNode;
}

const Button: React.FC<props> = ({
    bgColor = 'bg-[#800080]',
    TextColor = 'text-[white]',
    handleFunction,
    className,
    children,
}) => {
    const handleDefault = ()=>{
        console.log('Button clicked');
    }
    return (
        <button onClick={handleFunction || handleDefault} className={`text-base cursor-pointer py-[8px] px-3 rounded-md ${bgColor} ${TextColor} hover:opacity-80 ${className}`}>
            {children}
        </button>
    )
}

export default Button