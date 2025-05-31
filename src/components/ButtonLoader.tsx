const ButtonLoader = () => {
    return (
        <div className="flex flex-row justify-center items-center w-full gap-2 py-2">
            <div className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:.7s]"></div>
            <div className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:.3s]"></div>
            <div className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:.7s]"></div>
        </div>
    )
}

export default ButtonLoader