import { useState } from 'react'
import { useAuth } from '../AuthContext'
import { useNotebooks } from './NotebooksContext'
import { useEffect } from 'react'
import { Icon } from '../Icon'
import { Nav } from '../Nav'
import { NewNotebookModal } from './NewNotebookModal'
import { Notebook } from './Notebook'


export function Notebooks(){
    const [isOpen, setIsOpen]= useState()
    const {user} = useAuth()
    const {userNotebooks, getNotebooks, isLoading} = useNotebooks()
    useEffect(()=> {
        getNotebooks()
    },[user])
    if(isLoading) return <div className="">Loading...</div>
    return (
        <>
        <Nav>
            <button>
                Log out
            </button>
        </Nav>
        <div className="relative">
            {isOpen && <NewNotebookModal close={()=>{setIsOpen(false)}}/>}
            <div className="overflow-y-auto h-138 w-full p-20">
                <div className="h-fit w-271 flex flex-wrap justify-start gap-x-10
                    gap-y-8 m-auto">
                    <div className="bg-(--dark-green) w-45 h-60 flex flex-col items-center 
                        rounded-2xl  border-l-17 border-[#381807]  shadow-gray-800 
                        shadow-xl/40 relative">
                        <button className='w-full h-full flex justify-center text-white 
                            font-medium text-xl flex-col cursor-pointer
                            items-center' onClick={()=> {setIsOpen(true)}}>
                                <Icon iconName={'add_notebook'} style={'w-8 fill-white'} />
                                Create notebook
                                <div className="bg-[#fcf9f1] w-45 h-8 absolute bottom-1 
                                    right-0 rounded-l-3xl rounded-r shadow-(--shadow)
                                    border-l-6 border-[#381807]">
                                    <hr className='mt-2 w-43 ml-1 text-[#c4c1b1]' />
                                    <hr className='mt-1 w-43 ml-1 text-[#c4c1b1]' />
                                    <hr className='mt-1 w-43 ml-1 text-[#c4c1b1]' />
                                    <hr className='mt-1 w-43 ml-1 text-[#c4c1b1]' />
                                    <hr className='mt-1 w-43 ml-1 text-[#c4c1b1]' />
                                </div>
                        </button>
                    </div>
                    {userNotebooks && userNotebooks.map((notebook) => 
                        <Notebook notebook={notebook} key={notebook.name}/>
                    )}
                </div>

            </div>
        </div>
        </>
    )
}