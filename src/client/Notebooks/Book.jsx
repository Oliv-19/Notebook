import { Dropdown } from "../Dropdown"
import { Icon } from "../Icon"

export function Book({color, children}){
    return (
        <>
        <div style={{'--style': color}} className="bg-(--style) w-full h-full flex flex-col items-center 
            rounded-2xl shadow-gray-800 shadow-xl/40 relative rounded-br">
                <div className="w-full h-full flex">
                    <div className="bg-[#381807] w-[15%] h-full rounded-l-2xl"/>
                    <div className="w-full h-full flex justify-center">
                        {children}  

                    </div>

                </div>
            <div className="bg-[#fcf9f1] w-full h-6 absolute  bottom-1 
                right-0 rounded-l-3xl rounded-r shadow-(--shadow)
                border-l-6 border-[#381807]">
                <hr className='mt-2 w-[98%] ml-0.5 text-[#c4c1b1]' />
                <hr className='mt-1 w-[98%] ml-0.5 text-[#c4c1b1]' />
                <hr className='mt-1 w-[98%] ml-0.5 text-[#c4c1b1]' />
            </div>
        </div>
        </>
    )
}