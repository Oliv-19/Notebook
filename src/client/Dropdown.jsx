
export function Dropdown({isOpen, position = 'top-12 right-1', close, children}){
    return (
        <>
        <div onClick={close} 
                className={`${isOpen? 'block': 'hidden'} z-2 fixed inset-0 
                bg-black/5 transition-opacity` }/>
        {isOpen && 
            <div className={`z-3 absolute ${position} min-w-40 max-w-50
                bg-(--green) w-40 p-1 h-fit rounded  max-h-100 `}>
                    <div className={`h-full flex-col w-full flex 
                        overflow-y-auto overflow-x-hidden 
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400`}
                        >
                        {children}
                    </div>
            </div>
        }
        </>
    )
}