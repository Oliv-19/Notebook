export function Modal({close, children}){
    return (
        <>
        <div className="w-screen h-screen top-0 right-0 absolute z-4 flex items-center justify-center">
            <div onClick={close} 
                className="h-full w-full absolute bg-black/20" />
            <div className="bg-(--green) w-150 h-fit z-5 rounded-2xl mb-15">
                {children}
            </div>
        </div>
        
        </>
    )
}